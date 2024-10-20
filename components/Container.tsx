import { View } from "react-native";

interface ContainerProps extends React.ComponentProps<typeof View> {}
export const Container = ({
  children,
  className,
  ...props
}: ContainerProps) => {
  return (
    <View className={`${styles.container} ${className}`} {...props}>
      {children}
    </View>
  );
};

const styles = {
  container: "flex flex-1 m-6",
};
