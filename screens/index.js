import * as React from "react";
import { useDispatch } from "react-redux";

import { initialization } from "../redux/serviceSlice";
import Root from "./root";
import * as SplashScreen from "expo-splash-screen";

export default function Index() {
  const dispatch = useDispatch();
  dispatch(initialization()).then(() => SplashScreen.hideAsync());
  return <Root />;
}
