import React from "react";
import { Text, View } from "react-native";

import { Button } from "~/components/Button";
import { themeColor } from "~/constant/theme";
import {
  ApiMockType,
  useApiMockStateContext,
} from "~/provider/ApiMockProvider";

export default function ApiMockPanel() {
  const { apiMockState, apiMockStateDispatch } = useApiMockStateContext();

  const changeApiMockState = (value: typeof apiMockState.state) => {
    apiMockStateDispatch({
      type: ApiMockType.SET_STATE,
      payload: { state: value },
    });
  };

  return (
    <View className="mt-2 border-2 border-neutral-950 p-4">
      <Text className="font-bold">Api Mock Panel</Text>

      <Text className="mt-4">State:</Text>
      <View
        className="mt-1 flex-row items-center gap-2"
        style={{ flexWrap: "wrap" }}>
        <Button
          className="border-[1px] border-neutral-950 shadow-none"
          style={{
            backgroundColor:
              apiMockState.state === "success"
                ? themeColor.blue[100]
                : "transparent",
          }}
          onPress={() => {
            changeApiMockState("success");
          }}>
          <Text>Success</Text>
        </Button>

        <Button
          className="border-[1px] border-neutral-950 shadow-none"
          style={{
            backgroundColor:
              apiMockState.state === "insufficient funds"
                ? themeColor.blue[100]
                : "transparent",
          }}
          onPress={() => {
            changeApiMockState("insufficient funds");
          }}>
          <Text>Insufficient funds</Text>
        </Button>

        <Button
          className="border-[1px] border-neutral-950 shadow-none"
          style={{
            backgroundColor:
              apiMockState.state === "network issues"
                ? themeColor.blue[100]
                : "transparent",
          }}
          onPress={() => {
            changeApiMockState("network issues");
          }}>
          <Text>Network Error</Text>
        </Button>
      </View>
    </View>
  );
}
