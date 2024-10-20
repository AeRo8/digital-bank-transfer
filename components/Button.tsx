import { forwardRef } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export const Button = forwardRef<TouchableOpacity, TouchableOpacityProps>(
  ({ children, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`${styles.button} ${touchableProps.className}`}>
       {children}
      </TouchableOpacity>
    );
  }
);

const styles = {
  button: "items-center bg-blue-100 rounded-lg shadow-md p-3",
  buttonText: "text-white text-lg text-center",
};
