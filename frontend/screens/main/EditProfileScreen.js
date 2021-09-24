import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../store/actions/user";
import * as ImagePicker from "expo-image-picker";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/HeaderButton";
import Input from "../../components/Input";

const defaultAvatarURL =
  "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [name, setName] = useState(currentUser.name);
  const [desc, setDesc] = useState(currentUser.desc ? currentUser.desc : "");
  const [image, setImage] = useState(
    currentUser.avatarURL ? currentUser.avatarURL : defaultAvatarURL
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    const childPath = `userAvatar/${firebase.auth().currentUser.uid}`;
    const response = await fetch(uri);
    const blob = await response.blob();

    const task = await firebase.storage().ref().child(childPath).put(blob);

    const downloadURL = await firebase
      .storage()
      .ref(childPath)
      .getDownloadURL();

    return downloadURL;
  };

  const saveUserProfile = useCallback(async () => {
    let downloadURL;
    if (
      (name !== "" && name !== currentUser.name) ||
      (desc !== "" && desc !== currentUser.desc) ||
      image !== defaultAvatarURL
    ) {
      downloadURL = await uploadImage(image);

      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          name: name,
          desc: desc,
          avatarURL: downloadURL,
        });

      dispatch(userActions.fetchUserPosts());
      navigation.goBack();
    }
  }, [name, desc, image]);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Brak dostępu do galerii");
      }
    })();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            color="#1c78a3"
            title="Save"
            iconName="checkmark"
            onPress={saveUserProfile}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, saveUserProfile]);

  return (
    <View style={styles.screen}>
      <View style={styles.avatarBox}>
        <View style={styles.avatar}>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </View>
        <TouchableOpacity style={styles.buttonPicker} onPress={pickImage}>
          <Text style={styles.buttonPickerText}>Zmień zdjęcie profilowe</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Input
          stylesInput={styles.input}
          stylesInputBox={styles.inputBox}
          stylesLabel={styles.label}
          placeholderTextColor="black"
          label="Nazwa użytkownika"
          value={name}
          onChange={(name) => setName(name)}
        />
        <Input
          stylesInput={styles.input}
          stylesInputBox={styles.inputBox}
          stylesLabel={styles.label}
          placeholderTextColor="black"
          placeholder="Przykładowy opis..."
          label="Opis"
          value={desc}
          onChange={(desc) => setDesc(desc)}
          multiline
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  avatarBox: {
    alignItems: "center",
    paddingTop: 10,
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 45,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonPicker: {
    paddingVertical: 10,
  },
  buttonPickerText: {
    fontSize: 16,
    color: "#03adfc",
  },
  form: {
    alignItems: "center",
    paddingTop: 10,
  },
  input: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    color: "black",
    paddingHorizontal: 0,
  },
  inputBox: {
    width: "90%",
    paddingHorizontal: 0,
  },
  label: {
    textAlign: "left",
    fontSize: 14,
    color: "#7d7d7d",
  },
});

export const screenOptions = (navData) => {
  const save = navData.route.params?.save;
  return {
    headerTitle: "Edytuj profil",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          color="black"
          title="Zamknij"
          iconName="close-outline"
          onPress={() => navData.navigation.goBack()}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProfileScreen;
