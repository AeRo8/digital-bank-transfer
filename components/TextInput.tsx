import React from "react";
import {
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  Text,
  View,
  ViewProps,
} from "react-native";

import { themeColor } from "~/constant/theme";

interface TextInputProps extends NativeTextInputProps {
  containerProps?: ViewProps;
  prependComponent?: React.ReactNode;
  customTextInputComponent?: React.ReactNode;
  errors?: string;
}
export default function TextInput({
  containerProps,
  prependComponent,
  customTextInputComponent,
  errors,
  ...props
}: TextInputProps) {
  const { className: containerClassName, ...restContainerProps } =
    containerProps || {};

  return (
    <>
      <View
        className={`${styles.container} ${containerClassName}`}
        {...restContainerProps}>
        {Boolean(prependComponent) && prependComponent}

        {customTextInputComponent ? (
          customTextInputComponent
        ) : (
          <NativeTextInput
            cursorColor={themeColor.neutral[950]}
            style={{
              padding: 0,
              flex: 1,
            }}
            {...props}
          />
        )}
      </View>

      {Boolean(errors) && (
        <Text className="mt-1 text-sm text-red-500">{errors}</Text>
      )}
    </>
  );
}

const styles = {
  container: "text-xl flex-row gap-2 items-center ",
};
