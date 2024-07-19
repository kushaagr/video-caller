import { Stack, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { JsStack } from "../layouts/js-stack";
import { TransitionPresets } from "@react-navigation/stack";

//* Enable Modal on Android
//* https://github.com/expo/router/issues/640#issuecomment-2025301864
//* https://docs.expo.dev/router/advanced/stack/#javascript-stack-with-react-navigationstack
export default function Layout() {
  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={styles.safeAreaView}> */}
      <JsStack>
        <Stack.Screen name="index" />
        <Stack.Screen name="joinscreen" options={{ headerShown: true }} />
        {/* <Stack.Screen name="callscreen" options={{ presentation: "modal" }} /> */}
        <JsStack.Screen
          name="callscreen"
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: "modal",
            gestureEnabled: true
          }}
        />
      </JsStack>
      {/* <Slot /> */}
      <StatusBar style="auto" />
      {/* </SafeAreaView> */}
    </SafeAreaProvider>
  );
  // return (
  //   <Stack>
  //     <Stack.Screen />
  //   </Stack>
  // )
  // return <Stack/>
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
    // backgroundColor: "red",
  }
});
