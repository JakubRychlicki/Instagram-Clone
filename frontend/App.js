import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { firebaseConfig } from "./config/firebase";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { Provider } from "react-redux";
import { store } from "./store";

import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";
import MainNavigator from "./navigation/MainNavigator";
import LoadingScreen from "./components/Loading";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false);
        setLoaded(true);
      } else {
        setLoggedIn(true);
        setLoaded(true);
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {loggedIn && <MainNavigator />}
        {loaded && !loggedIn && <AuthNavigator />}
        {!loaded && !loggedIn && <LoadingScreen />}
      </NavigationContainer>
    </Provider>
  );
}
