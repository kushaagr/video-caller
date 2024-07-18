import React from 'react';
import { Stack } from "expo-router";
import { StyleSheet, View } from 'react-native';

export default function JoinScreen() {
  return (
    <Stack>
      <Stack.Screen name="joinscreen" options={{title: "Join a call"}} />
      <View style={styles.fakescreen}/>
    </Stack>
  );
}

const styles = StyleSheet.create({
  fakescreen: {
    margin: 40,
    borderRadius: 20,
    backgroundColor: "black",
  }
});