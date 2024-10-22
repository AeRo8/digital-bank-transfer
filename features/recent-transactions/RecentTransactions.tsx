import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useState } from "react";
import { RefreshControl, Text, View } from "react-native";

import { Button } from "~/components/Button";
import NotFound from "~/components/NotFound";
import { PaymentState, usePaymentContext } from "~/provider/PaymentProvider";
import { formatCurrency } from "~/utils/general";

type Transaction = PaymentState["paymentHistory"][number];

const keyExtractor = (item: Transaction) => item.id;

export default function RecentTransactions() {
  const [refreshing, setRefreshing] = useState(false);
  const { paymentState } = usePaymentContext();

  const transactionsList = paymentState.paymentHistory;

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      // TODO: Fetching API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderedItem = useCallback(
    ({ item, index }: { item: Transaction; index: number }) => {
      return (
        <View
          className="flex-row items-center justify-between border-neutral-400"
          style={{
            borderTopWidth: index === 0 ? 0 : 1,
          }}>
          <View className="gap-1 py-3">
            <Text className="mb-0 font-bold">{item?.name}</Text>
            <Text className="mb-0">{item?.bank}</Text>
            <Text className="mb-0 italic">{item?.bankAccountNumber}</Text>
            <Text className="text-sm">
              {formatCurrency(item.paymentAmount)}
            </Text>

            <Text className="text-sm">
              Status:{" "}
              <Text
                className={`${item.status === "success" ? "text-green-500" : "text-red-500"}`}>
                {item.status.toLocaleUpperCase()}
              </Text>
            </Text>
          </View>

          {item.status === "failed" && (
            <Button className="bg-neutral-600">
              <Text className="text-neutral-50">Resend</Text>
            </Button>
          )}
        </View>
      );
    },
    []
  );

  return (
    <View className="w-full flex-1">
      <View className="mt-12 items-start">
        <View className="rounded-full">
          <Text className="border-b-2 border-blue-100 pb-1 text-lg font-bold">
            Recent Transactions
          </Text>
        </View>
      </View>

      <FlashList
        data={transactionsList}
        renderItem={renderedItem}
        estimatedItemSize={129.5}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <NotFound className="my-10" title="No transaction found" />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }

        // extraData={[transactionsList.length]}
      />
    </View>
  );
}
