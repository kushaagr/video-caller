import React from "react";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../../ctx";
import { User } from "../sign-in";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User as StreamUser,
} from '@stream-io/video-react-native-sdk';
import { useEffect, useState } from 'react';

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY || '';
// const apiKey = process.env.STREAM_API_KEY;
// const token = process.env.STREAM_TOKEN;

function generateRandomString(length: number) : string {
  // return 'default-test-123-point-141592653';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
  let result = '';
  const scale = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * scale));
  }
  return result;
}


export default function CallScreen() {
  const { session } = useSession();

  // useEffect(() => {
  //   const userData: User = JSON.parse(session);
  //   const token = userData.token;
  //   const callId = generateRandomString(6);
  //   const userId = userData.userId;
  //   const user : StreamUser = { id: userId };

  //   console.log("Creating call..", `Id: ${callId}`, { apiKey, token });

  //   const client = new StreamVideoClient({ apiKey, user, token });
  //   const call = client.call('default', callId);
  //   call.join({ create: true });

  //   // call.leave()
  //   // return call.endCall();
  // }, []);


  // console.log(process.env)
  // console.log(process.env.EXPO_PUBLIC_STREAM_API_KEY)

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
