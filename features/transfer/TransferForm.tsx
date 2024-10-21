import {
  BottomSheetFlashList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import TransferBottomSheetSelect from "./TransferBottomSheetSelect";

import { Button } from "~/components/Button";
import { Icon } from "~/components/Icon";
import TextInput from "~/components/TextInput";
import { contactList } from "~/constant/contact-list";
import { themeColor } from "~/constant/theme";

type Contact = (typeof contactList)[number];

const keyExtractor = (contact: Contact) => contact.bankAccountNumber;

export default function TransferForm() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedContact, setSelectedContact] = useState<Contact>();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const onSelectBank = (item: Contact) => {
    setSelectedContact(item);
    bottomSheetModalRef.current?.close();
  };

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
    []
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
            <TransferBottomSheetSelect
              textInputProps={{
                placeholder: "Recipient",
                value: selectedContact?.name,
                style: {
                  color: themeColor.neutral[950],
                },
              }}
              onPress={handlePresentModalPress}>
              <TransferBottomSheetSelect.Label>
                Select recipient
              </TransferBottomSheetSelect.Label>
            </TransferBottomSheetSelect>

            <View
              style={{
                borderBottomColor: themeColor.gray[700],
                borderBottomWidth: 2,
                paddingBottom: 4,
              }}>
              <Text className="text-lg">Enter transfer amount</Text>

              <TextInput
                placeholder="Amount"
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
              />
            </View>

            <View
              style={{
                borderBottomColor: themeColor.gray[700],
                borderBottomWidth: 2,
                paddingBottom: 4,
              }}>
              <Text className="text-lg">Optional note</Text>

              <TextInput placeholder="Note" />
            </View>

            <Button className="mt-4">
              <Text className="font-bold color-white">Send</Text>
            </Button>
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
