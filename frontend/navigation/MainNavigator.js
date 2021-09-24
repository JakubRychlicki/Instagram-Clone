import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import MainScreen from "../screens/main/MainScreen";
import AddScreen from "../screens/main/AddScreen";
import SaveScreen, {
  screenOptions as saveScreenOptions,
} from "../screens/main/SaveScreen";

export default MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add"
        component={AddScreen}
        options={{ headerTitle: "Zrób zdjęcie" }}
      />
      <Stack.Screen
        name="Save"
        component={SaveScreen}
        options={saveScreenOptions}
      />
    </Stack.Navigator>
  );
};
