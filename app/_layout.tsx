import { Stack, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { JsStack } from "../layouts/js-stack";
import { TransitionPresets } from "@react-navigation/stack";
import { SessionProvider } from "../ctx";

//* Enable Modal on Android
//* https://github.com/expo/router/issues/640#issuecomment-2025301864
//* https://docs.expo.dev/router/advanced/stack/#javascript-stack-with-react-navigationstack
export default function Layout() {
  return (
    <SessionProvider>
      <SafeAreaProvider>
        {/* Maybe enable SafeArea for Platform.OS === ios */}
        {/* <SafeAreaView style={styles.safeAreaView}> */}
        <JsStack>
          <Stack.Screen name="index" options={{ headerShown: true }} />
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </JsStack>
        {/* <Slot /> */}
        <StatusBar style="auto" />
        {/* </SafeAreaView> */}
      </SafeAreaProvider>
    </SessionProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
    // backgroundColor: "red",
  }
});
