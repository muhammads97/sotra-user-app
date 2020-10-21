import * as React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./home/HomeScreen";
import LoginScreen from "./login/LoginScreen";
import VerificationScreen from "./verification/VerificationScreen";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import OrderConfirmationScreen from "./orderConfirmation/OrderConfirmationScreen";

const Stack = createStackNavigator();

export default function Root() {
  const loggedIn = useSelector((state) => state.client.loggedIn);
  const loading = useSelector((state) => state.client.loading);
  const error = useSelector((state) => state.client.error);
  const status = useSelector((state) => state.client.status);
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
          <Stack.Screen
            name="OrderConfirmation"
            component={OrderConfirmationScreen}
          />
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
