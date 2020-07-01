import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import * as SecureStore from "expo-secure-store";
import { LoginService } from "./loginEngine";

const token_dummy =
  "eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZSI6IisyMDEwMjE3MTc4OTIiLCJsYXN0X2xvZ2luIjoxNTkxNDgzMzY0fQ.Cr7H0xQiGWdr5XLoOW90EkQc-_I4IHQuOwdOC8wKuSI";
class LoadingManager {
  constructor() {
    this.loginService = new LoginService();
  }

  async prepareResources() {
    await this.loadAssets();
    let token = await SecureStore.getItemAsync("token");
    // token = token_dummy;
    if (token != null) {
      let user = await this.performAPICalls(token);
      if (user == null) return null;
      user.token = token;
      return user;
    } else {
      return "";
    }
    // return token;
  }
  async performAPICalls(token) {
    let res = await this.loginService.getUser(token);
    if (res.ok) {
      let json = await res.json().catch(() => {
        return null;
      });
      if (json == null) return null;
      return json.client;
    }
    return "";
  }
  async loadAssets() {
    // Load fonts
    await Font.loadAsync({
      ...Ionicons.font,
      "poppins-black": require("../assets/fonts/poppins/Poppins-Black.ttf"),
      "poppins-black-italic": require("../assets/fonts/poppins/Poppins-BlackItalic.ttf"),
      "poppins-bold": require("../assets/fonts/poppins/Poppins-Bold.ttf"),
      "poppins-bold-italic": require("../assets/fonts/poppins/Poppins-BoldItalic.ttf"),
      "poppins-extra-bold": require("../assets/fonts/poppins/Poppins-ExtraBold.ttf"),
      "poppins-extra-bold-italic": require("../assets/fonts/poppins/Poppins-ExtraBoldItalic.ttf"),
      "poppins-extra-light": require("../assets/fonts/poppins/Poppins-ExtraLight.ttf"),
      "poppins-extra-light-italic": require("../assets/fonts/poppins/Poppins-ExtraLightItalic.ttf"),
      "poppins-italic": require("../assets/fonts/poppins/Poppins-Italic.ttf"),
      "poppins-light": require("../assets/fonts/poppins/Poppins-Light.ttf"),
      "poppins-light-italic": require("../assets/fonts/poppins/Poppins-LightItalic.ttf"),
      "poppins-medium": require("../assets/fonts/poppins/Poppins-Medium.ttf"),
      "poppins-medium-italic": require("../assets/fonts/poppins/Poppins-MediumItalic.ttf"),
      "poppins-regular": require("../assets/fonts/poppins/Poppins-Regular.ttf"),
      "poppins-semi-bold": require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
      "poppins-semi-bold-italic": require("../assets/fonts/poppins/Poppins-SemiBoldItalic.ttf"),
      "poppins-thin": require("../assets/fonts/poppins/Poppins-Thin.ttf"),
      "poppins-thin-italic": require("../assets/fonts/poppins/Poppins-ThinItalic.ttf"),
    });
  }
}

export default LoadingManager;
