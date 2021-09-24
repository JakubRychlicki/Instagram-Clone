import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { nFormatter } from "../helpers/formatNumber";

const windowWidth = Dimensions.get("window").width;

const ProfileInfo = (props) => {
  const {
    isAuth,
    isFollowed,
    name,
    avatarURL,
    postsNumber,
    followersNumber,
    followedNumber,
    desc,
    onEditProfile,
    onFollowProfile,
    onUnfollowProfile,
    onModal,
  } = props;

  const renderButton = (isAuth, isFollowed) => {
    if (isAuth) {
      return (
        <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
          <Text style={styles.editButtonText}>Edytuj profil</Text>
        </TouchableOpacity>
      );
    } else {
      if (isFollowed) {
        return (
          <TouchableOpacity
            style={styles.editButton}
            onPress={onUnfollowProfile}
          >
            <Text style={styles.editButtonText}>Przestań obserwować</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity style={styles.editButton} onPress={onFollowProfile}>
            <Text style={styles.editButtonText}>Obserwuj</Text>
          </TouchableOpacity>
        );
      }
    }
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileHeader}>
        {isAuth ? (
          <TouchableOpacity onPress={onModal} style={styles.profileBox}>
            <Text style={styles.profileHeaderText}>{name}</Text>
            <MaterialCommunityIcons
              name="chevron-down"
              color="black"
              size={26}
            />
          </TouchableOpacity>
        ) : (
          <Text style={styles.profileHeaderText}>{name}</Text>
        )}
      </View>
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageBox}>
            <Image
              style={styles.profileImage}
              source={{
                uri: avatarURL,
              }}
            />
          </View>
        </View>
        <View style={styles.profileInfoNumbersContainer}>
          <View style={styles.profileInfoNumberBox}>
            <Text style={styles.infoNumber}>{postsNumber}</Text>
            <Text style={styles.infoText}>Posty</Text>
          </View>
          <View style={styles.profileInfoNumberBox}>
            <Text style={styles.infoNumber}>{nFormatter(followersNumber)}</Text>
            <Text style={styles.infoText} numberOfLines={1}>
              Obserwujących
            </Text>
          </View>
          <View style={styles.profileInfoNumberBox}>
            <Text style={styles.infoNumber}>{nFormatter(followedNumber)}</Text>
            <Text style={styles.infoText}>Obserwuje</Text>
          </View>
        </View>
      </View>
      <View style={styles.profileDescContainer}>
        <Text>{desc}</Text>
      </View>
      {renderButton(isAuth, isFollowed)}
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  profileHeader: {
    height: 50,
    justifyContent: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5,
  },
  profileBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileHeaderText: {
    paddingLeft: 20,
    fontSize: 22,
  },
  profileInfoContainer: {
    flexDirection: "row",
    height: 150,
  },
  profileImageContainer: {
    width: windowWidth * 0.3,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImageBox: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: 40,
    overflow: "hidden",
  },
  profileImage: {
    height: "100%",
    width: "100%",
  },
  profileInfoNumbersContainer: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  profileInfoNumberBox: {
    width: windowWidth * 0.2,
    alignItems: "center",
  },
  infoNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 12,
  },
  profileDescContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  editButton: {
    width: windowWidth * 0.8,
    alignSelf: "center",
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  editButtonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ProfileInfo;
