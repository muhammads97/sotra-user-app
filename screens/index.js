import * as React from "react";
import { useDispatch } from "react-redux";

import { initialization } from "../redux/clientSlice";
import Root from "./root";
import * as SplashScreen from "expo-splash-screen";
import { I18nManager } from "react-native";
I18nManager.allowRTL(false);
export default function Index() {
  const dispatch = useDispatch();
  dispatch(initialization()).then(() => SplashScreen.hideAsync());
  return <Root />;
}
