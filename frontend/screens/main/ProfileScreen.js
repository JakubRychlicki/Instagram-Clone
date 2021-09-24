import firebase from "firebase";
require("firebase/firestore");

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, FlatList, StatusBar } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as usersActions from "../../store/actions/users";
import * as userActions from "../../store/actions/user";

import ModalLogout from "../../components/ModalLogout";
import ProfileInfo from "../../components/ProfileInfo";

const ProfileScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const userId = route.params.uid;
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserPosts = useSelector((state) => state.user.posts);
  const following = useSelector((state) => state.user.following);

  useEffect(() => {
    if (userId === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(currentUserPosts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          }
        });

      firebase
        .firestore()
        .collection("posts")
        .doc(userId)
        .collection("userPosts")
        .orderBy("creationDate", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPosts(posts);
        });
    }

    if (following.indexOf(userId) > -1) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }

    return () => {
      setUser(null);
      setUserPosts([]);
    };
  }, [userId, currentUser, currentUserPosts, following, onFollow, onUnfollow]);

  const onFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(userId)
      .set({});

    dispatch(userActions.fetchUserFollowing());
  };

  const onUnfollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(userId)
      .delete();

    dispatch(usersActions.removePostsUnfollowedUser(userId));
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  if (user === null) {
    return <View />;
  }

  return (
    <View style={styles.screen}>
      <ProfileInfo
        isAuth={userId === firebase.auth().currentUser.uid}
        isFollowed={isFollowing}
        name={user.name}
        avatarURL={
          user.avatarURL
            ? user.avatarURL
            : "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
        }
        postsNumber={userPosts.length}
        followersNumber={user.followsCount}
        followedNumber={user.followedCount}
        desc={user.desc ? user.desc : ""}
        onEditProfile={() => navigation.navigate("EditProfile")}
        onFollowProfile={onFollow}
        onUnfollowProfile={onUnfollow}
        onModal={() => setIsVisibleModal(true)}
      />
      <View style={styles.galleryContainer}>
        <FlatList
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.imageItemBox}>
              <Image
                style={styles.imageItem}
                source={{ uri: item.downloadURL }}
              />
            </View>
          )}
          numColumns={3}
          horizontal={false}
        />
      </View>
      <ModalLogout
        isVisibleModal={isVisibleModal}
        onClose={() => setIsVisibleModal(false)}
        onLogout={logout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  galleryContainer: {
    flex: 1,
  },
  imageItemBox: {
    flex: 1 / 3,
    margin: 2,
  },
  imageItem: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

export default ProfileScreen;
