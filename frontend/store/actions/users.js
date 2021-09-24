import * as actionsTypes from "./actionsTypes";
import firebase from "firebase";

export const fetchUsersData = (uid, getPosts) => {
  return (dispatch, getState) => {
    const found = getState().users.users.some((el) => el.uid === uid);

    if (!found) {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let user = snapshot.data();
            user.uid = snapshot.id;

            dispatch({
              type: actionsTypes.USERS_DATA_STATE_CHANGE,
              user,
            });
            if (getPosts) {
              dispatch(fetchUsersFollowingPosts(uid));
            }
          } else {
            console.log("does not exist");
          }
        });
    }
  };
};

export const fetchUsersFollowingPosts = (uid) => {
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("creationDate", "desc")
      .get()
      .then((snapshot) => {
        const uid = snapshot.query._.C_.path.segments[1];

        let user = getState().users.users.find((el) => el.uid === uid);

        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data, user };
        });

        for (let i = 0; i < posts.length; i++) {
          dispatch(fetchUsersFollowingLikes(uid, posts[i].id));
        }
        dispatch({
          type: actionsTypes.USERS_POSTS_STATE_CHANGE,
          posts: posts,
        });
      });
  };
};

export const reloadUsersFollowingPosts = (uid) => {
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("creationDate", "desc")
      .get()
      .then((snapshot) => {
        const uid = snapshot.query._.C_.path.segments[1];

        let user = getState().users.users.find((el) => el.uid === uid);

        const existingPosts = getState().users.feed;

        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data, user };
        });

        const newPosts = posts.filter(
          (post) => !existingPosts.some((existPost) => existPost.id === post.id)
        );

        if (newPosts.length) {
          for (let i = 0; i < newPosts.length; i++) {
            dispatch(fetchUsersFollowingLikes(uid, newPosts[i].id));
          }
          dispatch({
            type: actionsTypes.RELOAD_USERS_POSTS,
            posts: newPosts,
          });
        }
      });
  };
};

export const fetchUsersFollowingLikes = (uid, postId) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
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
          type: actionsTypes.USERS_LIKES_STATE_CHANGE,
          postId,
          currentUserLike,
        });
      });
  };
};

export const removePostsUnfollowedUser = (uid) => {
  return {
    type: actionsTypes.REMOVE_POSTS_UNFOLLOWED_USER,
    uid,
  };
};

export const likePostUser = (postId) => {
  return {
    type: actionsTypes.LIKE_POST_USER,
    postId,
  };
};
export const dislikePostUser = (postId) => {
  return {
    type: actionsTypes.DISLIKE_POST_USER,
    postId,
  };
};
