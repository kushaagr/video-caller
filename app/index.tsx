import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Pressable,
  GestureResponderEvent
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack, Link } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function handlePress(evn: GestureResponderEvent) {
    console.log("Push notification");
    await schedulePushNotification();
    // console.log(evn);
  }

  return (
    // <SafeAreaProvider>
    //   <SafeAreaView style={styles.safeAreaView}>

    <View style={styles.viewbox}>
      <Stack.Screen options={{ title: "Home" }} />
      <Link href="/joinscreen" style={styles.callButton} asChild>
        <Pressable
          onPress={async () => {
            await schedulePushNotification();
          }}
        >
          <Text>Join Call</Text>
        </Pressable>
      </Link>
      <Link href="/callscreen" style={styles.callButton}>
        Create call
      </Link>
    </View>

    //     <StatusBar style="auto" />
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  viewbox: {
    borderColor: "hotpink",
    borderStyle: "dashed",
    borderWidth: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  callButton: {
    borderRadius: 10,
    backgroundColor: "gainsboro",
    padding: 15,
    marginVertical: 10,
    width: "50%",
    maxWidth: 300,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You joined a call",
      body: `at ${(new Date()).toTimeString()}`,
      data: { data: "goes here", test: { test1: "more data" } }
    },
    // trigger: { seconds: 2 },
    trigger: null
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C"
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
