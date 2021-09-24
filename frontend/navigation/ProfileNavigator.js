import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import ProfileScreen from "../screens/main/ProfileScreen";
import EditProfileScreen, {
  screenOptions as profileEditOptions,
} from "../screens/main/EditProfileScreen";

export default ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainProfile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={profileEditOptions}
      />
    </Stack.Navigator>
  );
};
