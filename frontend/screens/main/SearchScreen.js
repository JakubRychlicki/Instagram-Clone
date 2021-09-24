import firebase from "firebase";
require("firebase/firestore");

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";

const defaultAvatarURL =
  "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

const SearchScreen = (props) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection("users")
      .where("name", ">=", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Szukaj"
          onChangeText={(search) => fetchUsers(search)}
        />
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.searchItem}
            onPress={() =>
              props.navigation.navigate("Profile", {
                screen: "MainProfile",
                params: {
                  uid: item.id,
                },
              })
            }
          >
            <View style={styles.searchItemContentBox}>
              <View style={styles.searchItemAvatar}>
                <Image
                  style={styles.searchItemAvatarImage}
                  source={{
                    uri: item.avatarURL ? item.avatarURL : defaultAvatarURL,
                  }}
                />
              </View>
              <Text style={styles.searchItemText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  inputBox: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  input: {
    height: 40,
    backgroundColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
  },
  searchItem: {
    height: 60,
    paddingLeft: 20,
    paddingVertical: 10,
    justifyContent: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  searchItemContentBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchItemAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    overflow: "hidden",
  },
  searchItemAvatarImage: {
    height: "100%",
    width: "100%",
  },
  searchItemText: {
    fontSize: 18,
    paddingLeft: 10,
  },
});

export default SearchScreen;
