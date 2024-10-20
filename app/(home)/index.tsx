import { Link } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { Icon } from "~/components/Icon";

const INITIAL_BALANCE = 1_000;

export default function Home() {
  const [totalBalance, setTotalBalance] = useState(INITIAL_BALANCE);

  return (
    <Container>
      <Text className="">Total balance</Text>
      <Text className="my-2 text-2xl font-bold">
        {new Intl.NumberFormat("ms-MY", {
          style: "currency",
          currency: "MYR",
        }).format(totalBalance)}
      </Text>

      <Link href="/(home)/(transfer)" asChild>
        <Button className="mt-4">
          <View className="flex-row items-center gap-3">
            <Text className="mb-0 font-bold color-white">Transfer Payment</Text>
            <Icon name="arrow-circle-up" color="white" size={24} />
          </View>
        </Button>
      </Link>
    </Container>
  );
}
