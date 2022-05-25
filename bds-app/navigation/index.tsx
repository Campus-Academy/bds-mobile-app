/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import { useEffect, useState } from "react";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AddEventModal from "../screens/AddEventModal";
import AddNewModal from "../screens/AddNewModal";
import LoginScreen from "../screens/LoginScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ModifyNewModal from "../screens/ModifyNewModal";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SignInScreen from "../screens/SignInScreen";
import NewsManagementScreen from "../screens/NewsManagementScreen";
import SportsScreen from "../screens/SportsScreen";
import EventsScreen from "../screens/EventsScreen";
import AdministrationScreen from "../screens/AdministrationScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Connexion", headerShown: true }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "Inscription", headerShown: true }}
      />
      <Stack.Screen
        name="NewsManagement"
        component={NewsManagementScreen}
        options={{ title: "Gestion des News", headerShown: true }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          options={{ title: "Publier un événement" }}
          name="AddEventModal"
          component={AddEventModal}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          options={{ title: "Publier une news" }}
          name="AddNewModal"
          component={AddNewModal}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          options={{ title: "Modifier une news" }}
          name="ModifyNewModal"
          component={ModifyNewModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [connectedUser, setconnectedUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    telephone: "",
    mail: "",
    password: "",
    role: "",
  });
  const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {},
  });
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
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          tabBarLabel: "Accueil",
          tabBarShowLabel: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () =>
            connectedUser.role === "Administrateur" ? (
              <Pressable
                onPress={() => navigation.navigate("AddNewModal")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="plus-circle"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            ) : null,
          title: "Accueil",
        })}
      />
      <BottomTab.Screen
        name="Events"
        component={EventsScreen}
        options={({ navigation }: RootTabScreenProps<"Events">) => ({
          tabBarLabel: "Événements",
          tabBarShowLabel: true,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
          headerRight: () =>
            connectedUser.role === "Administrateur" ? (
              <Pressable
                onPress={() => navigation.navigate("AddEventModal")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="plus-circle"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            ) : null,
          title: "Événements",
        })}
      />
      <BottomTab.Screen
        name="Sports"
        component={SportsScreen}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="gamepad" color={color} />
          ),
          title: "Les sports",
        }}
      />
      {connectedUser.role === "Administrateur" ? (
        <BottomTab.Screen
          name="Administration"
          component={AdministrationScreen}
          options={{
            tabBarShowLabel: true,
            tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
            title: "Administration",
          }}
        />
      ) : null}

      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: "Mon profil",
          tabBarBadge: 1,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          title: "Mon profil",
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
