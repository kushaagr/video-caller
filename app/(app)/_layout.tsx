import { Stack, Redirect } from "expo-router";
import React from "react";
import { JsStack } from "../../layouts/js-stack";
import { TransitionPresets } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../../ctx";
import { ActivityIndicator } from "react-native";

export default function Layout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <ActivityIndicator />;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    alert("You are logged out!");
    return <Redirect href="/sign-in" />;
  }
  return (
    <JsStack>
      <Stack.Screen name="callscreen" options={{ headerShown: false }} />
      <JsStack.Screen
        name="joinscreen"
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          presentation: "modal",
          gestureEnabled: true
        }}
      />
    </JsStack>
  );
}
