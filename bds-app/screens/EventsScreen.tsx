import { StyleSheet, useColorScheme } from "react-native";

import { Card, Title, Paragraph } from "react-native-paper";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { API_URL } from "react-native-dotenv";

import "moment/locale/fr";

import moment from "moment";

export default function SportsScreen({
  navigation,
}: RootTabScreenProps<"Home">) {
  let colorScheme = useColorScheme();
  const [events, setEvents] = useState([
    {
      _id: "",
      title: "",
      description: "",
      capacity: "",
      place: "",
      date: "",
      price: "",
      modality: "",
      author: "",
      creationDate: "",
      authorDetails: [
        {
          _id: "",
          firstName: "",
          lastName: "",
          mail: "",
          password: "",
          role: "",
          telephone: "",
        },
      ],
    },
  ]);
  const getEvents = async () => {
    const resp = await axios.get(`${API_URL}/events/details`);
    setEvents(resp.data.reverse());
  };

  useEffect(() => {
    getEvents();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getEvents();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {events.map((events) => {
          return (
            <Card.Content
              style={colorScheme === "dark" ? styles.cardDark : styles.card}
              key={events._id}
            >
              <Title
                style={colorScheme === "dark" ? styles.titleDark : styles.title}
              >
                Titre : {events.title}
              </Title>
              <Paragraph
                style={
                  colorScheme === "dark" ? styles.contentDark : styles.content
                }
              >
                Description : {events.description}
              </Paragraph>
              <Paragraph
                style={
                  colorScheme === "dark" ? styles.contentDark : styles.content
                }
              >
                Lieu : {events.place}
              </Paragraph>
              <Paragraph
                style={
                  colorScheme === "dark" ? styles.contentDark : styles.content
                }
              >
                Nombre de places disponibles : {events.capacity} place(s)
              </Paragraph>
              <Paragraph
                style={
                  colorScheme === "dark" ? styles.contentDark : styles.content
                }
              >
                Prix : {events.price} €
              </Paragraph>
              <Paragraph
                style={
                  colorScheme === "dark" ? styles.contentDark : styles.content
                }
              >
                Date : {moment(events.date).locale("fr").format("LL")}
              </Paragraph>
              <Paragraph
                style={
                  colorScheme === "dark" ? styles.contentDark : styles.content
                }
              >
                Modalités de participation : {events.modality}
              </Paragraph>
              <Text style={styles.footer}>
                {events.authorDetails[0].firstName}{" "}
                {events.authorDetails[0].lastName} -{" "}
                {moment(events.creationDate, "YYYY-MM-DD[T]HH:mm:ss")
                  .locale("fr")
                  .fromNow()}
              </Text>
            </Card.Content>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.26,
    elevation: 50,
    marginBottom: 5,
    width: "100%",
    // borderRadius: 10,
    padding: 5,
    backgroundColor: "white",
  },
  cardDark: {
    shadowColor: "white",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.26,
    elevation: 50,
    marginBottom: 5,
    width: "100%",
    // borderRadius: 10,
    padding: 5,
    backgroundColor: "#183152",
  },
  contentDark: {
    fontSize: 12,
    color: "white",
  },

  titleDark: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  footer: {
    margin: 0,
    color: "#999",
    fontSize: 15,
    fontStyle: "italic",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#06004E",
  },
  content: {
    fontSize: 12,
    color: "#06004E",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
