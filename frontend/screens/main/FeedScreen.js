import firebase from "firebase";
require("firebase/firestore");

import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as usersActions from "../../store/actions/users";

import Post from "../../components/Post";
import Loading from "../../components/Loading";

const FeedScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [posts, setPosts] = useState(null);
  const feed = useSelector((state) => state.users.feed);
  const userPosts = useSelector((state) => state.user.posts);
  const following = useSelector((state) => state.user.following);
  const users = useSelector((state) => state.users.users);

  const loadProducts = useCallback(async () => {
    setIsRefreshing(true);

    if (users.length > 0) {
      for (let i = 0; i < following.length; i++) {
        try {
          await dispatch(usersActions.reloadUsersFollowingPosts(following[i]));
        } catch (err) {
          console.log(err.message);
        }
      }
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, following, users]);

  useEffect(() => {
    let allPosts = feed.concat(userPosts);

    if (
      (following.length && following.length !== 0) ||
      userPosts.length !== 0
    ) {
      allPosts
        .sort((x, y) => {
          return x.creationDate - y.creationDate;
        })
        .reverse();
      setPosts(allPosts);
    }
  }, [feed, userPosts, onLike, onDislike]);

  const onLike = (userId, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .set({});

    dispatch(usersActions.likePostUser(postId));
  };

  const onDislike = (userId, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .delete();

    dispatch(usersActions.dislikePostUser(postId));
  };

  if (posts === null || isLoading) {
    return <Loading />;
  }

  if (posts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={posts}
        renderItem={({ item }) => (
          <Post
            username={item.user ? item.user.name : ""}
            avatarImageURL={
              item.user
                ? item.user.avatarURL
                  ? item.user.avatarURL
                  : "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                : null
            }
            postImageURL={item.downloadURL}
            caption={item.caption}
            likes={item.likesCount}
            isLiked={item.currentUserLike}
            onLike={() => onLike(item.user.uid, item.id)}
            onDislike={() => onDislike(item.user.uid, item.id)}
            goToComments={() =>
              navigation.navigate("Feed", {
                screen: "Comments",
                params: {
                  postId: item.id,
                  uid: item.user.uid,
                },
              })
            }
          />
        )}
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 50,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    paddingLeft: 10,
  },
});
