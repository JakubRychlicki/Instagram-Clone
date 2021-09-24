import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import FeedScreen from "../screens/main/FeedScreen";
import CommentsScreen from "../screens/main/CommentsScreen";

export default FeedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainFeed"
        component={FeedScreen}
        options={{
          headerTitle: "INSTAGRAM CLONE",
        }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ headerTitle: "Komentarze" }}
      />
    </Stack.Navigator>
  );
};
