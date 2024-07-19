import React from "react";
import { Stack, Link, router } from "expo-router";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function CallScreen() {
  const isPresented = router.canGoBack();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  return (
    <View style={styles.container}>
      {/* <Stack.Screen options={{headerShown: false, presentation: 'modal'}} /> */}
      {!isPresented && (
        <Link style={styles.dismissButton} href="../">
          Dismiss
        </Link>
      )}
      <TextInput placeholder="Call id..."  style={styles.useridInput} />
      <Pressable><Text style={[styles.joinButton]}>Join call</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  dismissButton: {
    padding: 5,
    width: "100%",
    marginHorizontal: "auto",
    marginVertical: 10,
    borderWidth: 2,
    textAlign: "center",
    borderRadius: 0,
    fontWeight: "bold"
  },
  joinButton: {
    width: "100%",
    backgroundColor: "dodgerblue",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    color: "white ,"
  },
  useridInput: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  } 
});
