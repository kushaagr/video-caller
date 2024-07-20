import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { router, Stack } from "expo-router";
import { useSession } from "../ctx";

export type User = {
  userId: string;
  token: string;
};

const users: User[] = [
  {
    userId: "Samay",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiU2FtYXkiLCJleHAiOjE3MjE0ODA0OTYsImlhdCI6MTcyMTQ3Njg5NX0.wtCGesQOJJ5CFQYRNNS8TuTh3lQSC6ooRBCb12rLBG0"
  },
  {
    userId: "Biswa",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQmlzd2EiLCJleHAiOjE3MjE0ODA0OTYsImlhdCI6MTcyMTQ3Njg5NX0.ygTf4PmGJtTnaF51Zqb8UiDlIiF15okS8opiYpDXH3w"
  },
  {
    userId: "Tanmay",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVGFubWF5IiwiZXhwIjoxNzIxNDgwNDk2LCJpYXQiOjE3MjE0NzY4OTV9.USUk4290hQ-WhdAFrZdUQr2yfjVOmpzMunRiK9rYLkk"
  },
  {
    userId: "Zakhir",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWmFraGlyIiwiZXhwIjoxNzIxNDgwNDk2LCJpYXQiOjE3MjE0NzY4OTV9.qwZbpFBQb_utn_eWcOkRNRlWAohdKQIm-Boz5YnOncg"
  }
];

function UserCard({ data }: { data: User }) {
  const { signIn } = useSession();
  function onPress(userId, token) {
    signIn({ userId, token }); 
    router.replace("(app)");
    
    // router.navigate("(app)");
    // router.navigate("/testscreen/")
    // router.replace("(app)/joinscreen");
  }

  return (
    <Pressable
      onPress={() => onPress(data.userId, data.token)}
      android_ripple={{color: "white", borderless: false}}
      style={(state) => [
        { backgroundColor: state.pressed ? "gainsboro" : "#eee" },
        styles.card
      ]}
    >
      <Text style={[styles.cardItems, styles.title]}>{data.userId}</Text>
      <Text numberOfLines={1} style={styles.cardItems}>
        {data.token}
      </Text>
    </Pressable>
  );
}

export default function SignIn() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign in" }} />
      <Text style={styles.title}> Choose a dummy profile </Text>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth
        }}
      />
      <FlatList
        data={users}
        renderItem={({ item }) => <UserCard data={item} />}
        keyExtractor={(item) => item.token}
        // ItemSeparatorComponent={() => <View style={{height: 17}} />}
        contentContainerStyle={{ gap: 20, marginVertical: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white"
  },
  card: {
    // borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    gap: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 100,
      height: 100
    }
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  cardItems: {}
});
