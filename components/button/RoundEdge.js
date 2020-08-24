import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  StatusBar,
} from "react-native";
import Colors from "../../constants/Colors";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;

export default function RoundEdgeButton({ style, onPress, textStyle, text }) {
  return (
    <TouchableOpacity
      style={[style, styles.button]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={[textStyle, styles.buttonText]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    width: "66.66%",
    height: 0.0578125 * screenHeight,
    borderRadius: 0.02890625 * screenHeight,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 0.0625 * screenHeight,
    marginBottom: 0.0625 * screenHeight,
  },
  buttonText: {
    fontFamily: "poppins-regular",
    color: "#fff",
    fontSize: 17,
    marginTop: 2,
  },
});
