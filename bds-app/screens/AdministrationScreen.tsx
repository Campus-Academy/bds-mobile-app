import { StyleSheet } from "react-native";
import { IconButton, Button, Colors } from "react-native-paper";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function AdministrationScreen({
  navigation,
}: RootTabScreenProps<"Home">) {
  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Button
          onPress={() => {
            console.log("event");
          }}
          icon="calendar"
        >
          Gestions des événements
        </Button>
        <Button
          onPress={() => {
            console.log("user");
          }}
          icon="account-cog"
        >
          Gestion des utilisateurs
        </Button>
        <Button
          onPress={() => navigation.navigate("NewsManagement")}
          icon="new-box"
        >
          Gestion des news
        </Button>
        <Button
          onPress={() => {
            console.log("sport");
          }}
          icon="handball"
        >
          Gestion des sports et eSports
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  line: {
    display: "flex",
  },
});
