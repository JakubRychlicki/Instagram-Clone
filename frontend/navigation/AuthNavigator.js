import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import LandingScreen from "../screens/auth/Landing";
import RegisterScreen from "../screens/auth/Register";
import LoginScreen from "../screens/auth/Login";

export default AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerTitle: "Zarejestruj się" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: "Zaloguj się" }}
      />
    </Stack.Navigator>
  );
};
