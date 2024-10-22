import React from "react";
import { Text, View, ViewProps } from "react-native";

type WithoutTitle = {
  children?: undefined;
  title: string;
};

type WithTitle = {
  children: React.ReactNode;
  title?: undefined;
};

type TitleProps = WithoutTitle | WithTitle;

type NotFoundProps = Omit<ViewProps, "children"> & TitleProps;

export default function NotFound({
  title,
  children,
  className,
  ...props
}: NotFoundProps) {
  return (
    <View className={`${style.container} ${className}`} {...props}>
      {children ? children : <Text>{title ? title : "Not found"}</Text>}
    </View>
  );
}

const style = {
  container: "items-center justify-center",
};
