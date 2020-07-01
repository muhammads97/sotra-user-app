import * as React from "react";
import { View, Image, Dimensions, StatusBar } from "react-native";
import * as Icons from "../constants/Icons";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default class SplashScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar hidden={true} />
        <Image
          source={require("../assets/images/Logo.png")}
          style={{
            width: 0.3 * screenWidth,
            height: 0.2 * screenHeight,
          }}
          resizeMode={"contain"}
        ></Image>
      </View>
    );
  }
}
