import firebase from "firebase";
import React, { useState } from "react";
import { View } from "react-native";
import tw from "tailwind-react-native-classnames";

import Button from "../../components/Button";
import Input from "../../components/Input";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (type, value) => {
    setLoginData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const onSignIn = () => {
    const { email, password } = loginData;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {})
      .catch((err) => console.log(err));
  };

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Input
        onChange={(email) => inputChangeHandler("email", email)}
        label="E-mail"
      />
      <Input
        onChange={(password) => inputChangeHandler("password", password)}
        label="Hasło"
        secureTextEntry={true}
      />
      <Button text="Zaloguj się" onPress={onSignIn} />
    </View>
  );
};

export default Login;
