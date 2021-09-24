import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import Button from "../../components/Button";

const windowWidth = Dimensions.get("window").width;

const SaveScreen = (props) => {
  const navigation = useNavigation();
  const [caption, setCaption] = useState("");

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      // console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creationDate: firebase.firestore.FieldValue.serverTimestamp(),
        likesCount: 0,
      })
      .then(() => {
        navigation.popToTop();
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source={{ uri: props.route.params.image }}
        />
      </View>
      <View style={styles.captionBox}>
        <Text style={styles.captionText}>Opis:</Text>
        <TextInput
          style={styles.captionInput}
          value={caption}
          onChangeText={(caption) => setCaption(caption)}
        />
      </View>
      <View
        style={{
          width: windowWidth * 0.5,
          alignSelf: "center",
        }}
      >
        <Button text="Dodaj post" onPress={uploadImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBox: {
    height: "60%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  captionBox: {
    padding: 20,
  },
  captionText: {
    paddingBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  captionInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          color="black"
          title="Zamknij"
          iconName="close-outline"
          onPress={() => navData.navigation.popToTop()}
        />
      </HeaderButtons>
    ),
  };
};

export default SaveScreen;
