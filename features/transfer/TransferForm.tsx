import {
  BottomSheetFlashList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useFormik } from "formik";
import React, { useCallback, useRef, useState } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Yup from "yup";

import ApiMockPanel from "../api-mock/ApiMockPanel";
import TransferBottomSheetSelect from "./TransferBottomSheetSelect";

import { Button } from "~/components/Button";
import { Icon } from "~/components/Icon";
import TextInput from "~/components/TextInput";
import { mockApiMessage } from "~/constant/apiMock";
import { PASSWORD } from "~/constant/auth";
import { contactList } from "~/constant/contact-list";
import { themeColor } from "~/constant/theme";
import useBiometricAuth, { BiometricType } from "~/hooks/useBiometricAuth";
import { transferPayment } from "~/lib/apiMock";
import { useApiMockStateContext } from "~/provider/ApiMockProvider";
import { PaymentType, usePaymentContext } from "~/provider/PaymentProvider";
import { formatCurrency, isNumber } from "~/utils/general";

type Contact = (typeof contactList)[number];
type TransferFormSchema = {
  recipientAccountNumber: string;
  amount: string;
  note: string;
  password?: string;
};

const transferSchema = (balance: number, isValidatePassword?: boolean) => {
  const defaultSchema = Yup.object().shape({
    recipientAccountNumber: Yup.string().required("Recipient is required"),
    amount: Yup.string()
      .test("is-number", "Amount should be number", value => isNumber(value))
      .test("is-sufficient", "Insufficient funds", value =>
        typeof value === "undefined" ? false : parseFloat(value) <= balance
      )
      .required("Amount is required"),
    note: Yup.string(),
  });

  if (isValidatePassword) {
    return defaultSchema.concat(
      Yup.object().shape({
        password: Yup.string().required("Password is required"),
      })
    );
  }

  return defaultSchema;
};

const keyExtractor = (contact: Contact) => contact.bankAccountNumber;

export default function TransferForm() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<Contact>();
  const [isShowFallback, setIsShowFallback] = useState(false);
  const { getSecurityType, handleBiometricAuth } = useBiometricAuth();
  const { apiMockState } = useApiMockStateContext();
  const { paymentState, paymentDispatch } = usePaymentContext();

  const formik = useFormik<TransferFormSchema>({
    initialValues: {
      recipientAccountNumber: "",
      amount: "",
      note: "",
      password: "",
    },
    validationSchema: () =>
      transferSchema(paymentState.balance, isShowFallback),
    onSubmit: async values => {
      try {
        const updatePaymentState = () => {
          const paymentAmount = parseFloat(values.amount);

          paymentDispatch({
            type: PaymentType.SET_RECIPIENT,
            payload: {
              name: selectedRecipient?.name || "",
              bank: selectedRecipient?.bank || "",
              bankAccountNumber: values.recipientAccountNumber,
              paymentAmount,
              note: values.note,
            },
          });
          paymentDispatch({
            type: PaymentType.SET_BALANCE,
            payload: paymentState.balance - paymentAmount,
          });

          router.replace("/(home)/(transfer)/transfer-confirmation");
        };

        const result = await getSecurityType();

        if (result === BiometricType.None) {
          if (!isShowFallback) {
            setIsShowFallback(true);
            return;
          }

          const isPasswordValid = values.password === PASSWORD;

          if (isPasswordValid) {
            updatePaymentState();
          } else {
            alert("Password is invalid");
          }

          return;
        }

        const isBiometricAuthorized = await handleBiometricAuth();

        if (isBiometricAuthorized) {
          const response = await transferPayment({
            success: apiMockState.state === "success",
            message: mockApiMessage[apiMockState.state],
          });

          if (response.success) {
            updatePaymentState();
          } else {
            alert(response.message);
          }
        } else {
          alert("Biometric cancelled. Please try again.");
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again.");
      }
    },
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    isSubmitting,
  } = formik;

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const onSelectBank = useCallback((item: Contact) => {
    formik.setFieldValue(
      "recipientAccountNumber",
      item.bankAccountNumber,
      false
    );

    setSelectedRecipient(item);
    bottomSheetModalRef.current?.close();

    setTimeout(() => {
      formik.validateField("recipientAccountNumber");
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: (typeof contactList)[number] }) => {
      switch (item.type) {
        case "header": {
          return (
            <View
              style={{
                padding: 12,
                backgroundColor: themeColor.neutral[50],
              }}>
              <Text className="text-xl font-bold">Select a recipient</Text>

              <TextInput
                containerProps={{
                  className: "mt-4 rounded-3xl bg-gray-300 py-2 px-3",
                }}
                prependComponent={<Icon name="search" size={18} />}
                customTextInputComponent={
                  <BottomSheetTextInput
                    cursorColor={themeColor.neutral[950]}
                    style={{
                      flex: 1,
                    }}
                  />
                }
              />
            </View>
          );
        }
        default: {
          return (
            <Button
              className="shadow-none"
              style={{
                borderRadius: 0,
                backgroundColor: "transparent",
                alignItems: "flex-start",
                shadowOpacity: 0,
              }}
              onPress={() => onSelectBank(item)}>
              <Text className="font-bold">{item.name}</Text>
              <Text>{item.bank}</Text>
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  color: themeColor.gray[700],
                }}>
                {item.bankAccountNumber}
              </Text>
            </Button>
          );
        }
      }
    },
    [onSelectBank]
  );

  const itemSeparator = useCallback(() => {
    return (
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: themeColor.gray[300],
        }}
      />
    );
  }, []);

  return (
    <>
      <BottomSheetModalProvider>
        <GestureHandlerRootView style={{ padding: 20 }}>
          <View
            style={{
              gap: 24,
            }}>
            <View>
              <TransferBottomSheetSelect onPress={handlePresentModalPress}>
                <TransferBottomSheetSelect.Label>
                  Select recipient
                </TransferBottomSheetSelect.Label>

                <TransferBottomSheetSelect.Input
                  placeholder="Recipient"
                  value={selectedRecipient?.name}
                  style={{
                    color: themeColor.neutral[950],
                  }}
                />

                {Boolean(errors["recipientAccountNumber"]) &&
                  touched.recipientAccountNumber && (
                    <TransferBottomSheetSelect.Error>
                      {errors["recipientAccountNumber"]}
                    </TransferBottomSheetSelect.Error>
                  )}
              </TransferBottomSheetSelect>

              {Boolean(selectedRecipient) && (
                <View className="mt-1">
                  <Text
                    className="text-sm"
                    style={{
                      fontStyle: "italic",
                      color: themeColor.gray[700],
                    }}>
                    Bank: {selectedRecipient?.bank}
                  </Text>

                  <Text
                    className="text-sm"
                    style={{
                      fontStyle: "italic",
                      color: themeColor.gray[700],
                    }}>
                    Account Number: {selectedRecipient?.bankAccountNumber}
                  </Text>
                </View>
              )}
            </View>

            <View>
              <Text className="mb-2 text-xl font-bold">
                Balance:{" "}
                <Text
                  style={{ color: themeColor.blue[100], fontWeight: "bold" }}>
                  {formatCurrency(paymentState.balance)}
                </Text>
              </Text>

              <Text className="text-lg">Enter transfer amount</Text>

              <TextInput
                containerProps={{
                  className: "border-b-gray-700 border-b-2",
                }}
                placeholder="Amount"
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={handleChange("amount")}
                onBlur={handleBlur("amount")}
                value={`${values.amount}`}
                errors={errors["amount"]}
              />
            </View>

            <View>
              <Text className="text-lg">Payment note (optional)</Text>

              <TextInput
                containerProps={{
                  className: "border-b-gray-700 border-b-2",
                }}
                onChangeText={handleChange("note")}
                onBlur={handleBlur("note")}
                value={`${values.note}`}
                placeholder="Note"
              />
            </View>

            {isShowFallback && (
              <View>
                <Text className="text-lg">Enter Password:</Text>

                <TextInput
                  containerProps={{
                    className: "border-b-gray-700 border-b-2",
                  }}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={`${values.password}`}
                  errors={errors["password"]}
                  placeholder="Password"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus
                />
              </View>
            )}

            <Button
              className="mt-4"
              loading={isSubmitting}
              onPress={() => handleSubmit()}>
              <Text className="font-bold color-white">Send</Text>
            </Button>

            <ApiMockPanel />
          </View>

          <BottomSheetModal
            keyboardBehavior="fillParent"
            android_keyboardInputMode="adjustResize"
            ref={bottomSheetModalRef}>
            <BottomSheetView style={{}}>
              <View
                style={{
                  height: "100%",
                  width: "100%",
                }}>
                <BottomSheetFlashList
                  stickyHeaderIndices={[0]}
                  data={contactList}
                  renderItem={renderItem}
                  ItemSeparatorComponent={itemSeparator}
                  keyExtractor={keyExtractor}
                  estimatedItemSize={81.8}
                />
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </GestureHandlerRootView>
      </BottomSheetModalProvider>
    </>
  );
}
