import "../global.css";

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const unstable_settings = {
  initialRouteName: "(home)",
};

export default function RootLayout() {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <GestureHandlerRootView
      style={{ flex: 1, paddingTop: top, paddingBottom: bottom }}>
      <Stack>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
