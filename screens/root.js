import * as React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./home/HomeScreen";
import LoginScreen from "./login/LoginScreen";
import VerificationScreen from "./verification/VerificationScreen";
import BottomTabNavigator from "../navigation/BottomTabNavigator";

const Stack = createStackNavigator();

export default function Root() {
  const loggedIn = useSelector((state) => state.service.loggedIn);
  const loading = useSelector((state) => state.service.loading);
  const error = useSelector((state) => state.service.error);
  const status = useSelector((state) => state.service.status);
  if (loading) {
    return null;
  }
  if (loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          mode={"modal"}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
          {/* <Stack.Screen name="Map" component={Map} /> */}
          {/* <Stack.Screen name="Archive" component={Archived} /> */}
          {/* <Stack.Screen name="Stat" component={StatisticsScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          mode={"modal"}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Verify" component={VerificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
