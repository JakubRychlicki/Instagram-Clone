const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.addLike = functions.firestore
  .document("/posts/{creatorId}/userPosts/{postId}/likes/{userId}")
  .onCreate((snap, context) => {
    return db
      .collection("posts")
      .doc(context.params.creatorId)
      .collection("userPosts")
      .doc(context.params.postId)
      .update({
        likesCount: admin.firestore.FieldValue.increment(1),
      });
  });
exports.removeLike = functions.firestore
  .document("/posts/{creatorId}/userPosts/{postId}/likes/{userId}")
  .onDelete((snap, context) => {
    return db
      .collection("posts")
      .doc(context.params.creatorId)
      .collection("userPosts")
      .doc(context.params.postId)
      .update({
        likesCount: admin.firestore.FieldValue.increment(-1),
      });
  });
exports.addFollow = functions.firestore
  .document("/following/{creatorId}/userFollowing/{userId}")
  .onCreate((snap, context) => {
    return db
      .collection("users")
      .doc(context.params.creatorId)
      .update({
        followedCount: admin.firestore.FieldValue.increment(1),
      });
  });
exports.removeFollow = functions.firestore
  .document("/following/{creatorId}/userFollowing/{userId}")
  .onDelete((snap, context) => {
    return db
      .collection("users")
      .doc(context.params.creatorId)
      .update({
        followedCount: admin.firestore.FieldValue.increment(-1),
      });
  });
exports.addFollowToUser = functions.firestore
  .document("/following/{creatorId}/userFollowing/{userId}")
  .onCreate((snap, context) => {
    return db
      .collection("users")
      .doc(context.params.userId)
      .update({
        followsCount: admin.firestore.FieldValue.increment(1),
      });
  });
exports.removeFollowFromUser = functions.firestore
  .document("/following/{creatorId}/userFollowing/{userId}")
  .onDelete((snap, context) => {
    return db
      .collection("users")
      .doc(context.params.userId)
      .update({
        followsCount: admin.firestore.FieldValue.increment(-1),
      });
  });
