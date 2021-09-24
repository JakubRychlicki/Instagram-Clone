import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../components/Button";

const Landing = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#B3246A", "#CC204E"]}
        style={styles.background}
      />
      <View style={styles.buttons}>
        <Button
          text="Zaloguj się"
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          text="Zarejestruj się"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  buttons: {
    height: 100,
    justifyContent: "space-between",
  },
});

export default Landing;
