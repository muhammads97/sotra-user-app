import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import StickyHeader from "./StickyHeader";
import Colors from "../../constants/Colors";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;

export default function Header({
  icon,
  text,
  nav,
  backText,
  elevation,
  style,
  iconStyle,
  textStyle,
}) {
  const headerView = (
    <View style={[styles.header, style]}>
      <Text style={[styles.headerText, textStyle]}>{text}</Text>
      <Image source={icon} resizeMode={"contain"} style={[iconStyle]} />
    </View>
  );
  return (
    <StickyHeader
      nav={nav}
      backText={backText}
      elevation={elevation}
      headerComponent={headerView}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 10,
    borderRadius: 0.0333 * screenWidth,
  },
  headerText: {
    fontFamily: "poppins-medium",
    fontSize: 0.0225 * screenHeight,
    color: "#fff",
    marginLeft: "6.5%",
  },
});
