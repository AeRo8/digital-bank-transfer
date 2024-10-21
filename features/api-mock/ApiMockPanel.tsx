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
    <View
      style={{
        padding: 12,
        marginTop: 12,
        borderWidth: 2,
        borderColor: themeColor.neutral[950],
      }}>
      <Text className="font-bold">Api Mock Panel</Text>

      <Text className="mt-4">State:</Text>
      <View
        className="mt-1 flex-row items-center gap-2"
        style={{ flexWrap: "wrap" }}>
        <Button
          className="shadow-none"
          style={{
            backgroundColor:
              apiMockState.state === "success"
                ? themeColor.blue[100]
                : "transparent",
            borderColor: themeColor.neutral[950],
            borderWidth: 1,
          }}
          onPress={() => {
            changeApiMockState("success");
          }}>
          <Text>Success</Text>
        </Button>

        <Button
          className="shadow-none"
          style={{
            backgroundColor:
              apiMockState.state === "insufficient funds"
                ? themeColor.blue[100]
                : "transparent",
            borderColor: themeColor.neutral[950],
            borderWidth: 1,
          }}
          onPress={() => {
            changeApiMockState("insufficient funds");
          }}>
          <Text>Insufficient funds</Text>
        </Button>

        <Button
          className="shadow-none"
          style={{
            backgroundColor:
              apiMockState.state === "network issues"
                ? themeColor.blue[100]
                : "transparent",
            borderColor: themeColor.neutral[950],
            borderWidth: 1,
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
