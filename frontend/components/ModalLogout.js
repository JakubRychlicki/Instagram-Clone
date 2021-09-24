import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

const ModalLogout = (props) => {
  if (!props.isVisibleModal) {
    return null;
  } else {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.isVisibleModal}
          onRequestClose={props.onClose}
        >
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPressOut={props.onClose}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={props.onLogout} style={styles.button}>
                <Text style={styles.buttonText}>WYLOGUJ SIĘ</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: 60,
    justifyContent: "center",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderBottomColor: "white",
    elevation: 5,
  },
  button: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: windowWidth * 0.6,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ModalLogout;
