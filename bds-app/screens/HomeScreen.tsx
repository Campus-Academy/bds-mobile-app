import { StyleSheet, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import axios from "axios";
import { Card, Title, Paragraph } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

import { API_URL } from "react-native-dotenv";

import "moment/locale/fr";

import moment from "moment";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"Home">) {
  let colorScheme = useColorScheme();
  const [news, setNews] = useState([
    {
      _id: "",
      title: "",
      content: "",
      date: "",
      author: "",
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

  const getNews = async () => {
    const resp = await axios.get(`${API_URL}/news/details`);
    setNews(resp.data.reverse());
  };

  useEffect(() => {
    getNews();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getNews();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {news.map((news) => {
          return (
            <Card.Content
              style={colorScheme === "dark" ? styles.cardDark : styles.card}
              key={news._id}
            >
              <Title
                style={colorScheme === "dark" ? styles.titleDark : styles.title}
              >
                {news.title}
              </Title>
              <Paragraph
                style={
                  colorScheme === "dark" ? styles.contentDark : styles.content
                }
              >
                {news.content}
              </Paragraph>
              <Text style={styles.footer}>
                {news.authorDetails[0].firstName}{" "}
                {news.authorDetails[0].lastName} -{" "}
                {moment(news.date, "YYYY-MM-DD[T]HH:mm:ss")
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
    //justifyContent: "center",
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
  titleDark: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    fontSize: 12,
    color: "#06004E",
  },
  contentDark: {
    fontSize: 12,
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
