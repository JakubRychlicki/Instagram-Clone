import firebase from "firebase";
require("firebase/firestore");

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

const CommentsScreen = ({ route }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [numberNewComment, setNumberNewComment] = useState(0);
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (route.params.postId !== postId) {
      firebase
        .firestore()
        .collection("posts")
        .doc(route.params.uid)
        .collection("userPosts")
        .doc(route.params.postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          let comments = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setComments(comments);
          setNumberNewComment(comments.length + 1);
        });
      setPostId(route.params.postId);
    } else {
      setComments(comments);
      setNumberNewComment(comments.length + 1);
    }
  }, [route.params.postId]);

  const onCommentSend = () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(route.params.uid)
      .collection("userPosts")
      .doc(postId)
      .collection("comments")
      .doc(numberNewComment.toString())
      .set({
        creator: firebase.auth().currentUser.uid,
        text,
        name: currentUser.name,
      });

    setText("");
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <View style={styles.commentItemBox}>
            <Text style={styles.commentUser}>{item.name}</Text>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Napisz komentarz"
          value={text}
          onChangeText={(text) => setText(text)}
          style={styles.input}
          numberOfLines={1}
        />
        <TouchableOpacity
          style={{ width: "30%", alignItems: "center" }}
          onPress={onCommentSend}
          disabled={text === ""}
        >
          <Text style={styles.buttonText}>Opublikuj</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  commentItemBox: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  commentUser: {
    fontWeight: "bold",
  },
  commentText: {
    paddingLeft: 5,
  },
  inputBox: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    width: "70%",
    height: 50,
  },
  buttonText: {
    color: "#4287f5",
  },
});

export default CommentsScreen;
