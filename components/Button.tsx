import { forwardRef } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export const Button = forwardRef<TouchableOpacity, TouchableOpacityProps>(
  ({ children, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`${styles.button} ${touchableProps.className}`}>
        <Text className={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    );
  }
);

const styles = {
  button: "items-center bg-indigo-500 rounded-[28px] shadow-md p-4",
  buttonText: "text-white text-lg font-semibold text-center",
};
