import { Stack } from "expo-router";
import { PaymentProvider, usePaymentContext } from "~/provider/PaymentProvider";

const HomeLayout = () => (
  <PaymentProvider>
    <Stack screenOptions={{ headerShown: false }} />
  </PaymentProvider>
);

export default HomeLayout;
