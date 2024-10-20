import { router, Slot } from "expo-router";
import { Pressable, View } from "react-native";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { Icon } from "~/components/Icon";
import { themeColor } from "~/constant/theme";

const TransferLayout = () => {
  return (
    <>
      <View className="items-start px-4 pt-3">
        <Button
          className="items-center justify-center rounded-3xl bg-transparent shadow-none"
          onPress={() => {
            router.back();
          }}>
          <Icon
            className="aspect-square w-[24]"
            name="chevron-left"
            size={26}
            color={themeColor.neutral[950]}
          />
        </Button>
      </View>

      <Slot />
    </>
  );
};

export default TransferLayout;
