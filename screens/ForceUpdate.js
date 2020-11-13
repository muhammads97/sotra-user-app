import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Text, Linking } from "react-native";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ForceUpdate(props) {
  const openPlayStore = () => {
    Linking.openURL("market://details?id=com.sotra.user");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Your version is no longer supported please update your app.
      </Text>
      <TouchableOpacity onPress={() => openPlayStore()} activeOpacity={0.7}>
        <Text style={[styles.text, { textDecorationLine: "underline" }]}>
          Click here to update now!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.primary,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontFamily: "poppins-regular",
    fontSize: 17,
    color: "#fff",
  },
});
