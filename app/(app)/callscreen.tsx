import React from "react";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CallScreen() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Join a call" }} />
        <View style={styles.fakescreen} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fakescreen: {
    margin: 0,
    // padding: 10,
    borderRadius: 10,
    backgroundColor: "black",
    width: "100%",
    height: "100%"
  },
  container: {
    padding: 20
  }
});
