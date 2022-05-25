import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"Home">) {
  const [connectedUser, setconnectedUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    telephone: "",
    mail: "",
    password: "",
    role: "",
    promotion: "",
  });

  const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {},
  });

  const disconnect = () => {
    storage.remove({
      key: "connectedUser",
    });
    navigation.navigate("Login");
  };

  useEffect(() => {
    storage
      .load({
        key: "connectedUser",
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          extraFetchOptions: {},
          someFlag: true,
        },
      })
      .then((ret) => {
        setconnectedUser(ret);
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {connectedUser.firstName} {connectedUser.lastName}
      </Text>
      <Text>{connectedUser.mail}</Text>
      <Text>{connectedUser.telephone}</Text>
      <Text>{connectedUser.role}</Text>
      <Text>{connectedUser.promotion}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          disconnect();
        }}
      >
        <Text style={{ color: "white" }}>Déconnexion</Text>
      </TouchableOpacity>
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
  button: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#06004E",
    width: 300,
    borderRadius: 30,
  },
});
