import * as actionsTypes from "./actionsTypes";
import firebase from "firebase";

import * as usersActions from "./users";

export const fetchUserData = () => {
  return (dispatch) => {
    dispatch(fetchUser());
    dispatch(fetchUserPosts());
    dispatch(fetchUserFollowing());
  };
};

export const fetchUser = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          dispatch({
            type: actionsTypes.USER_STATE_CHANGE,
            currentUser: snapshot.data(),
          });
        } else {
          console.log("does not exist");
        }
      });
  };
};

export const fetchUserPosts = () => {
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creationDate", "desc")
      .onSnapshot((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({
          type: actionsTypes.USER_POSTS_STATE_CHANGE,
          posts,
        });
        const user = getState().user.currentUser;
        dispatch({
          type: actionsTypes.ADD_USER_DATA_TO_POST,
          user: { ...user, uid: firebase.auth().currentUser.uid },
        });
        for (let i = 0; i < posts.length; i++) {
          dispatch(fetchUserPostLikes(posts[i].id));
        }
      });
  };
};

export const fetchUserFollowing = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .get()
      .then((snapshot) => {
        let following = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        dispatch({
          type: actionsTypes.USER_FOLLOWING_STATE_CHANGE,
          following,
        });
        for (let i = 0; i < following.length; i++) {
          dispatch(usersActions.fetchUsersData(following[i], true));
        }
      });
  };
};

export const fetchUserPostLikes = (postId) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        let currentUserLike = false;
        if (snapshot.exists) {
          currentUserLike = true;
        }

        dispatch({
          type: actionsTypes.USER_LIKES_STATE_CHANGE,
          postId,
          currentUserLike,
        });
      });
  };
};

export const clearData = () => {
  return (dispatch) => {
    dispatch({
      type: actionsTypes.CLEAR_DATA,
    });
  };
};
