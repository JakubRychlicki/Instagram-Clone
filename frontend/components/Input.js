import React from "react";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const Input = (props) => {
  return (
    <View style={[styles.inputBox, props.stylesInputBox]}>
      <Text style={[styles.label, props.stylesLabel]}>{props.label}</Text>
      <TextInput
        {...props}
        style={[styles.input, props.stylesInput]}
        onChangeText={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    width: windowWidth * 0.5,
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    textAlign: "center",
    paddingBottom: 5,
  },
  input: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ccc",
  },
});

export default Input;
