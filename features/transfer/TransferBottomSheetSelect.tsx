import { default as React } from "react";
import {
  Pressable,
  PressableProps,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  View,
} from "react-native";

import { Icon } from "~/components/Icon";
import { themeColor } from "~/constant/theme";

interface TransferBottomSheetSelectProps extends PressableProps {
  textInputProps: TextInputProps;
  children: React.ReactNode;
}
export default function TransferBottomSheetSelect({
  textInputProps,
  children,
  ...props
}: TransferBottomSheetSelectProps) {
  return (
    <>
      <Pressable
        style={{
          borderBottomColor: themeColor.gray[700],
          borderBottomWidth: 2,
          paddingBottom: 4,
        }}
        {...props}>
        {children}

        <View className="flex-row items-center justify-between ">
          <TextInput
            className="flex-1"
            readOnly
            placeholderTextColor={themeColor.gray[700]}
            {...textInputProps}
          />

          <Icon name="chevron-down" size={18} color={themeColor.gray[700]} />
        </View>
      </Pressable>
    </>
  );
}

interface TransferBottomSheetSelectLabelProps extends TextProps {}
function TransferBottomSheetSelectLabel(
  props: TransferBottomSheetSelectLabelProps
) {
  return <Text className="text-lg" {...props} />;
}

TransferBottomSheetSelect.Label = TransferBottomSheetSelectLabel;
