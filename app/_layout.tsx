import { Stack, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <Stack />
        {/* <Slot /> */}
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    // backgroundColor: "red",
  }
});
