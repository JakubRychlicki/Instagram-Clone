import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AddScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const takePictureHandler = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      navigation.navigate("Save", { image: data.uri });
    }
  };

  const pickImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      navigation.navigate("Save", { image: result.uri });
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera and gallery</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        ref={(ref) => setCamera(ref)}
        style={styles.cameraBox}
        type={type}
        ratio="1:1"
      />
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImageHandler}>
          <MaterialCommunityIcons
            name="folder-image"
            color="#f5d742"
            size={36}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePictureHandler}>
          <MaterialCommunityIcons
            name="camera-outline"
            color="#f54242"
            size={36}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <MaterialCommunityIcons
            name="camera-retake-outline"
            color="#b344c9"
            size={36}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraBox: {
    flex: 1,
    aspectRatio: 1,
  },
  actionsContainer: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    height: 50,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddScreen;
