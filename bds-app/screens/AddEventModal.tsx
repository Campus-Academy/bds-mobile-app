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

import DateTimePicker from "@react-native-community/datetimepicker";

import { API_URL } from "react-native-dotenv";

import "moment/locale/fr";

import moment from "moment";

export default function AddEventModal({
  navigation,
}: RootTabScreenProps<"Home">) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
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
  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const onSubmit = async (values: any) => {
    values["author"] = connectedUser._id;
    values["creationDate"] = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
    );
    values["date"] = moment(date).locale("fr").format("YYYY-MM-DD[T]HH:mm:ss");
    console.log(values);
    const resp = await axios.post(`${API_URL}/events`, values);
    navigation.navigate("Events");
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
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
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
              placeholder="Description"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="description"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Nombre de places"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              keyboardType="number-pad"
            />
          )}
          name="capacity"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Lieu"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="place"
          rules={{ required: true }}
        />
        <TextInput
          placeholder="Date"
          onFocus={showDatepicker}
          style={styles.input}
          onPressIn={showDatepicker}
          value={moment(date).locale("fr").format("LL").toString()}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Prix"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              keyboardType="number-pad"
            />
          )}
          name="price"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Modalités de participation"
              style={styles.textArea}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              multiline={true}
              numberOfLines={15}
            />
          )}
          name="modality"
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
    height: 100,
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
