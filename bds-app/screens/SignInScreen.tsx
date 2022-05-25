import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-community/picker";

import { RootTabScreenProps } from "../types";
import { FontAwesome } from "@expo/vector-icons";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { API_URL } from "react-native-dotenv";

const logo = require("../assets/images/logo.png");

import axios from "axios";
import { Text, View } from "../components/Themed";
import { ScrollView } from "react-native-gesture-handler";

export default function SignInScreen({
  navigation,
}: RootTabScreenProps<"Home">) {
  const [promotion, setPromotion] = useState("");
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values: any) => {
    values["promotion"] = promotion;
    values["role"] = "Etudiant";
    const resp = await axios.post(`${API_URL}/users`, values);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ height: 100, width: 100 }} />
      <TouchableOpacity
        onPress={() => navigation.replace("Login")}
        style={styles.link}
      >
        <Text style={styles.linkText}>
          <FontAwesome
            name="question-circle-o"
            size={15}
            style={{ marginRight: 15 }}
          />{" "}
          Je suis déjà membre
        </Text>
      </TouchableOpacity>
      <ScrollView>
        <Picker
          style={styles.input}
          selectedValue={promotion}
          onValueChange={(itemValue, itemIndex) =>
            setPromotion(itemValue.toString())
          }
        >
          <Picker.Item label="Veuillez choisir une promotion" value="" />
          <Picker.Item label="B1 Info-Tech" value="B1 Info-Tech" />
          <Picker.Item label="B2 Info-Tech" value="B2 Info-Tech" />
          <Picker.Item label="B3 Info-Tech" value="B3 Info-Tech" />
          <Picker.Item label="M1 Info-Tech" value="M1 Info-Tech" />
          <Picker.Item label="M2 Info-Tech" value="M2 Info-Tech" />
        </Picker>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Prénom"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="firstName"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Nom"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="lastName"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Téléphone"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              keyboardType="phone-pad"
            />
          )}
          name="telephone"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              keyboardType="email-address"
            />
          )}
          name="mail"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Mot de passe"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="password"
          rules={{ required: true }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: "white" }}>Inscription</Text>
        </TouchableOpacity>
        <StatusBar />
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
  button: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#06004E",
    width: 300,
    borderRadius: 30,
    marginLeft: 12,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  link: {
    paddingVertical: 15,
  },
});
