import { StatusBar } from "expo-status-bar";
import { Stack, Link } from "expo-router";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <View style={styles.viewbox}>
      <Stack.Screen options={{title: "Home"}} />
      <Link href="/joinscreen" style={styles.callButton}>
        <Text>Join Call</Text>
      </Link>
      <Link href="callscreen" style={styles.callButton}>
        <Text>Create Call</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
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
    alignItems: "center"
  }
});
