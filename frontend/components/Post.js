import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const windowHeight = Dimensions.get("window").height;

const Post = (props) => {
  const {
    username,
    avatarImageURL,
    postImageURL,
    caption,
    goToComments,
    onLike,
    onDislike,
    isLiked,
    likes,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.userInfoBox}>
        <View style={styles.userAvatar}>
          <Image style={styles.image} source={{ uri: avatarImageURL }} />
        </View>
        <Text style={styles.userInfoText}>{username}</Text>
      </View>
      <View style={styles.imageItemBox}>
        <Image style={styles.image} source={{ uri: postImageURL }} />
      </View>
      <View style={styles.actionsBox}>
        {isLiked ? (
          <MaterialCommunityIcons
            name="heart"
            color="red"
            size={30}
            onPress={onDislike}
          />
        ) : (
          <MaterialCommunityIcons
            name="heart-outline"
            color="black"
            size={30}
            onPress={onLike}
          />
        )}

        <MaterialCommunityIcons
          name="chat-outline"
          color="black"
          size={30}
          style={{ paddingLeft: 10 }}
        />
      </View>
      <View style={styles.likesBox}>
        <Text style={styles.likesText}>{likes} polubień</Text>
      </View>
      <View style={styles.captionBox}>
        <Text numberOfLines={2} style={styles.captionText}>
          <Text style={styles.captionUsernameText}>{username}</Text> {caption}
        </Text>
      </View>
      <View style={styles.commentBox}>
        <TouchableOpacity onPress={goToComments}>
          <Text style={styles.commentButtonText}>
            Zobacz wszystkie komentarze
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  userInfoBox: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  userAvatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "#ccc",
    overflow: "hidden",
  },
  userInfoText: {
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 10,
  },
  imageItemBox: {
    maxHeight: windowHeight * 0.6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  actionsBox: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingVertical: 5,
  },
  likesBox: {
    paddingLeft: 20,
  },
  likesText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  captionBox: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 15,
  },
  captionText: {
    fontSize: 14,
  },
  captionUsernameText: {
    fontWeight: "bold",
    marginRight: 5,
  },
  commentBox: {
    paddingLeft: 20,
    alignItems: "baseline",
  },
  commentButtonText: {
    color: "#ccc",
  },
});

export default Post;
