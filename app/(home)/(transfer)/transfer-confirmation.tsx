import React from "react";
import { Text, View } from "react-native";

import { usePaymentContext } from "~/provider/PaymentProvider";
import { formatCurrency } from "~/utils/general";

export default function TransferSuccess() {
  const { paymentState } = usePaymentContext();

  const recipient = paymentState.recipientSuccessInfo;

  if (!recipient) {
    throw new Error("Recipient is not set");
  }

  return (
    <View className="m-6 gap-8">
      <View className="gap-1">
        <Text className="font-bold">Status:</Text>
        <Text className="text-green-500">Success</Text>
      </View>

      <View className="gap-1">
        <Text className="font-bold">Recipient Name:</Text>
        <Text>{recipient.name}</Text>
      </View>

      <View className="gap-1">
        <Text className="font-bold">Recipient Bank:</Text>
        <Text>{recipient.bank}</Text>
      </View>

      <View className="gap-1">
        <Text className="font-bold">Recipient Bank Account Number:</Text>
        <Text>{recipient.bankAccountNumber}</Text>
      </View>

      <View className="gap-1">
        <Text className="font-bold">Payment Amount:</Text>
        <Text>{formatCurrency(recipient.paymentAmount)}</Text>
      </View>

      <View className="gap-1">
        <Text className="font-bold">Note:</Text>
        <Text>{recipient.note || "-"}</Text>
      </View>
    </View>
  );
}
