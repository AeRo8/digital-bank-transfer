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

interface TransferBottomSheetSelectProps extends PressableProps {}
export default function TransferBottomSheetSelect(
  props: TransferBottomSheetSelectProps
) {
  return <Pressable {...props} />;
}

interface TransferBottomSheetSelectInputProps extends TextInputProps {}
function TransferBottomSheetSelectInput(
  props: TransferBottomSheetSelectInputProps
) {
  return (
    <View className="flex-row items-center justify-between border-b-2 border-b-gray-700">
      <TextInput
        className="flex-1"
        readOnly
        placeholderTextColor={themeColor.gray[700]}
        {...props}
      />

      <Icon name="chevron-down" size={18} color={themeColor.gray[700]} />
    </View>
  );
}

interface TransferBottomSheetSelectLabelProps extends TextProps {}
function TransferBottomSheetSelectLabel(
  props: TransferBottomSheetSelectLabelProps
) {
  return <Text className="text-lg" {...props} />;
}

interface TransferBottomSheetSelectErrorProps extends TextProps {}
function TransferBottomSheetSelectError(
  props: TransferBottomSheetSelectErrorProps
) {
  return <Text className="mt-1 text-sm text-red-500" {...props} />;
}

TransferBottomSheetSelect.Input = TransferBottomSheetSelectInput;
TransferBottomSheetSelect.Label = TransferBottomSheetSelectLabel;
TransferBottomSheetSelect.Error = TransferBottomSheetSelectError;
