import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import React, { useEffect, useState } from "react";

import { Text, View } from "../components/Themed";
import { TextInput, TouchableOpacity, Button } from "react-native";

import { RootTabScreenProps } from "../types";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ScrollView } from "react-native-gesture-handler";

import { API_URL } from "react-native-dotenv";

import "moment/locale/fr";

import moment from "moment";

export default function AddNewModal({
  navigation,
}: RootTabScreenProps<"Home">) {
  const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {},
  });
  const [connectedUser, setconnectedUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    telephone: "",
    mail: "",
    password: "",
    role: "",
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (values: any) => {
    values["author"] = connectedUser._id;
    values["date"] = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
    );
    const resp = await axios.post(`${API_URL}/news`, values);
    navigation.navigate("Home");
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
      <ScrollView>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Titre"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="title"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Contenu du message"
              style={styles.textArea}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              multiline={true}
              numberOfLines={15}
            />
          )}
          name="content"
          rules={{ required: true }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: "white" }}>Publier</Text>
        </TouchableOpacity>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </ScrollView>
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
  textArea: {
    height: 250,
    borderRadius: 30,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "black",
    color: "black",
    textAlignVertical: "top",
  },
  button: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#06004E",
    marginLeft: 12,
    width: 300,
    borderRadius: 30,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  link: {
    paddingVertical: 15,
  },
});
