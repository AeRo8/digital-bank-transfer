import React from "react";
import { Text, View } from "react-native";

import TransferForm from "~/features/transfer/TransferForm";
import { ApiMockProvider } from "~/provider/ApiMockProvider";

export default function Transfer() {
  return (
    <>
      <View className="m-6">
        <Text className="text-2xl font-bold">Send money to</Text>
      </View>

      <ApiMockProvider>
        <TransferForm />
      </ApiMockProvider>
    </>
  );
}
