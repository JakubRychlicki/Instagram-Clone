import firebase from "firebase";

import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";

import SearchScreen from "../screens/main/SearchScreen";
import ProfileNavigator from "../navigation/ProfileNavigator";
import FeedNavigator from "../navigation/FeedNavigator";

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

export default MainNavigator = () => {
  return (
    <Tab.Navigator
      labeled={false}
      shifting={true}
      sceneAnimationEnabled={false}
      activeColor="black"
      inactiveColor="black"
      barStyle={{ backgroundColor: "#fff" }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            if (focused) {
              return <Entypo name="magnifying-glass" color={color} size={26} />;
            } else {
              return (
                <MaterialCommunityIcons
                  name="magnify"
                  color={color}
                  size={26}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="AddContainer"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Add");
          },
        })}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="plus-box-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Profile", {
              screen: "MainProfile",
              params: {
                uid: firebase.auth().currentUser.uid,
              },
            });
          },
        })}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account-circle" : "account-circle-outline"}
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
