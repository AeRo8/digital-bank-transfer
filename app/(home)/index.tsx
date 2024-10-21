import { Link } from "expo-router";
import { Text, View } from "react-native";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { Icon } from "~/components/Icon";
import { PaymentProvider, usePaymentContext } from "~/provider/PaymentProvider";
import { formatCurrency } from "~/utils/general";

export default function Home() {
  const { paymentState } = usePaymentContext();

  return (
    <PaymentProvider>
      <Container>
        <Text className="">Total balance</Text>
        <Text className="my-2 text-2xl font-bold">
          {formatCurrency(paymentState.balance)}
        </Text>

        <Link push href="/(home)/(transfer)" asChild>
          <Button className="mt-4">
            <View className="flex-row items-center gap-3">
              <Text className="mb-0 font-bold color-white">
                Transfer Payment
              </Text>
              <Icon name="arrow-circle-up" color="white" size={24} />
            </View>
          </Button>
        </Link>
      </Container>
    </PaymentProvider>
  );
}
