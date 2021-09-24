import firebase from "firebase";
import React, { useState } from "react";
import { View } from "react-native";
import tw from "tailwind-react-native-classnames";

import Button from "../../components/Button";
import Input from "../../components/Input";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const inputChangeHandler = (type, value) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const onSignUp = () => {
    const { email, password, name } = registerData;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
            followedCount: 0,
            followsCount: 0,
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Input
        label="Nazwa użytkownika"
        onChange={(name) => inputChangeHandler("name", name)}
      />
      <Input
        label="E-mail"
        onChange={(email) => inputChangeHandler("email", email)}
      />
      <Input
        label="Hasło"
        onChange={(password) => inputChangeHandler("password", password)}
        secureTextEntry={true}
      />
      <Button text="Zarejestruj się" onPress={onSignUp} />
    </View>
  );
};

export default Register;
