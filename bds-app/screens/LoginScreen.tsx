import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { API_URL } from "react-native-dotenv";

import {
  useColorScheme,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { RootTabScreenProps } from "../types";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const logo = require("../assets/images/logo.png");
const logo2 = require("../assets/images/logo2.png");
import { Text, View } from "../components/Themed";

import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({
  navigation,
}: RootTabScreenProps<"Home">) {
  let colorScheme = useColorScheme();
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [connectedUser, setconnectedUser] = useState({});

  const storage = new Storage({
    size: 1000,

    storageBackend: AsyncStorage,

    defaultExpires: 1000 * 3600 * 24,

    enableCache: true,

    sync: {},
  });

  const onSubmit = async (values: object) => {
    console.log(values);
    console.log(`${API_URL}/users/login`);
    const resp = await axios.post(`${API_URL}/users/login`, values);
    if (typeof resp.data == "string") {
      alert("Adresse mail ou mot de passe incorrect");
    } else {
      setconnectedUser(resp.data);
      storage.save({
        key: "connectedUser",
        data: resp.data,
        expires: 1000 * 3600,
      });
      navigation.navigate("Root");
    }
  };
  return (
    <View style={styles.container}>
      {colorScheme === "dark" ? (
        <Image source={logo2} style={{ height: 100, width: 100 }} />
      ) : (
        <Image source={logo} style={{ height: 100, width: 100 }} />
      )}
      <TouchableOpacity
        onPress={() => navigation.replace("SignIn")}
        style={styles.link}
      >
        <Text style={styles.linkText}>
          <FontAwesome
            name="question-circle-o"
            size={15}
            style={{ marginRight: 15 }}
          />{" "}
          Je ne suis pas encore membre
        </Text>
      </TouchableOpacity>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: "L'email est obligatoire" },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            style={colorScheme === "dark" ? styles.inputDark : styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="mail"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            style={colorScheme === "dark" ? styles.inputDark : styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
        rules={{ required: true }}
      />
      <StatusBar />
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: "white" }}>Connexion</Text>
        </TouchableOpacity>
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
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  input: {
    height: 50,
    borderRadius: 30,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "black",
    color: "black",
  },
  inputDark: {
    height: 50,
    borderRadius: 30,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    color: "white",
  },
  button: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#06004E",
    width: 300,
    borderRadius: 30,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
    paddingBottom: 10,
    paddingTop: 20,
  },
  link: {
    paddingVertical: 5,
  },
});
