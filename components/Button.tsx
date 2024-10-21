import { forwardRef } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { themeColor } from "~/constant/theme";

interface ButtonProps extends TouchableOpacityProps {
  loading?: boolean;
}
export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ children, loading, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        disabled={loading}
        className={`${styles.button} ${touchableProps.className}`}>
        {loading ? (
          <ActivityIndicator color={themeColor.neutral[50]} size="small" />
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
);

const styles = {
  button: "items-center bg-blue-100 rounded-lg shadow-md p-3",
  buttonText: "text-white text-lg text-center",
};
