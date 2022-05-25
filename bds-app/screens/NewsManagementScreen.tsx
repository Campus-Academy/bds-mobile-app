import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { RootTabScreenProps } from "../types";
import axios from "axios";
import { API_URL } from "react-native-dotenv";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import { SwipeListView } from "react-native-swipe-list-view";

const NewsManagementScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
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
    let itemArrays: any = [];
    `${API_URL}/news/details`;
    resp.data.reverse().forEach(function (data: any, index: any) {
      const newItem = { key: index, title: data.title, details: data.content };
      itemArrays.push(newItem);
    });
    setListData(itemArrays);
  };

  useEffect(() => {
    getNews();
  }, []);

  const [listData, setListData] = useState([
    {
      key: "",
      title: "",
      details: "",
    },
  ]);

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const openRowTopModify = (rowMap: any, rowKey: any) => {
    const itemToModify = news[rowKey];
    console.log(itemToModify);
    navigation.navigate("ModifyNewModal", { itemToModify });
  };

  const deleteRow = (rowMap: any, rowKey: any) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    const itemToDelete = news[rowKey];
    newData.splice(prevIndex, 1);
    setListData(newData);
    axios
      .delete(`${API_URL}/news/${itemToDelete._id}`)
      .then(() => console.log("Delete successful"));
  };

  const onRowDidOpen = (rowKey: any) => {
    console.log("This row opened", rowKey);
  };

  const onLeftActionStatusChange = (rowKey: any) => {
    console.log("onLeftActionStatusChange", rowKey);
  };

  const onRightActionStatusChange = (rowKey: any) => {
    console.log("onRightActionStatusChange", rowKey);
  };

  const onRightAction = (rowKey: any) => {
    console.log("onRightAction", rowKey);
  };

  const onLeftAction = (rowKey: any) => {
    console.log("onLeftAction", rowKey);
  };

  const VisibleItem = (props: any) => {
    const {
      data,
      rowHeightAnimatedValue,
      removeRow,
      leftActionState,
      rightActionState,
    } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return (
      <Animated.View
        style={[styles.rowFront, { height: rowHeightAnimatedValue }]}
      >
        <TouchableHighlight
          style={styles.rowFrontVisible}
          onPress={() => console.log("Element touched")}
          underlayColor={"#aaa"}
        >
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {data.item.title}
            </Text>
            <Text style={styles.details} numberOfLines={1}>
              {data.item.details}
            </Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderItem = (data: any, rowMap: any) => {
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const HiddenItemWithActions = (props: any) => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
      onEdit,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View
        style={[styles.rowBack, { height: rowHeightAnimatedValue }]}
      >
        <Text>Left</Text>
        {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onEdit}
          >
            <FontAwesome name="pencil" size={24} color="white" />
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}
            >
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: "clamp",
                        }),
                      },
                    ],
                  },
                ]}
              >
                <FontAwesome name="trash-o" size={24} color="white" />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
        onEdit={() => openRowTopModify(rowMap, data.item.key)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* <StatusBar backgroundColor="#FF6347" barStyle="light-content"/> */}
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        disableRightSwipe
        onRowDidOpen={onRowDidOpen}
        leftActivationValue={100}
        rightActivationValue={-200}
        leftActionValue={0}
        rightActionValue={-500}
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
      />
    </View>
  );
};

export default NewsManagementScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f4f4",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 1,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    paddingRight: 17,
    height: 60,
  },
  backRightBtnLeft: {
    backgroundColor: "#1f65ff",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#666",
  },
  details: {
    fontSize: 12,
    color: "#999",
  },
});
