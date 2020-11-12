import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import Colors from "../../constants/Colors";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;

export default function SquareButton({
  style,
  onPress,
  textStyle,
  text,
  icon,
  iconStyle,
}) {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={[styles.cardText, textStyle]}>{text}</Text>
      <Image style={iconStyle} source={icon} resizeMode="contain" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardText: {
    fontSize: 0.045 * screenWidth,
    fontFamily: "poppins-regular",
    color: "#fff",
    // lineHeight: 0.052 * screenWidth,
    margin: 0.03333 * screenWidth,
    marginTop: 0.04 * screenWidth,
    letterSpacing: 0,
  },
  card: {
    aspectRatio: 1,
    width: 0.378 * screenWidth,
    borderRadius: 12,
    elevation: 2.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.16,
    shadowRadius: 15,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
