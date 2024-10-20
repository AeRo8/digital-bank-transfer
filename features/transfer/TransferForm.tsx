import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import TransferBottomSheetSelect from "./TransferBottomSheetSelect";

export default function TransferForm() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView
        style={{
          padding: 20,
          // backgroundColor: "rgba(0,0,0,0.2)",
        }}>
        <TransferBottomSheetSelect
          textInputProps={{ placeholder: "Recipient" }}
          onPress={handlePresentModalPress}>
          <TransferBottomSheetSelect.Label>
            Select recipient
          </TransferBottomSheetSelect.Label>
        </TransferBottomSheetSelect>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}>
          <BottomSheetView
            style={{
              flex: 1,
              alignItems: "center",
            }}>
            <BottomSheetTextInput
              style={{
                marginTop: 8,
                marginBottom: 10,
                borderRadius: 10,
                fontSize: 16,
                lineHeight: 20,
                padding: 8,
                backgroundColor: "rgba(151, 151, 151, 0.25)",
              }}
            />

            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  );
}
