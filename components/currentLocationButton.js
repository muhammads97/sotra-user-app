import * as React from "react";
import { StyleSheet, Image, Dimensions, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icons from "../constants/Icons";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;

export default function CurrentLocation({ style, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.plusButton, style]}
      activeOpacity={0.8}
      onPress={() => onPress()}
    >
      <Image
        source={Icons.locationTag}
        style={styles.plusIcon}
        resizeMode={"contain"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  plusButton: {
    width: 0.1 * screenWidth,
    aspectRatio: 1,
    borderRadius: 0.05 * screenWidth,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 10,
    shadowOpacity: 0.16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  plusIcon: {
    width: 0.03 * screenWidth,
    height: 0.03 * screenWidth,
  },
});
