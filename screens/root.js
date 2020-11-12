import * as React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./home/HomeScreen";
import LoginScreen from "./login/LoginScreen";
import VerificationScreen from "./verification/VerificationScreen";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import OrderConfirmationScreen from "./orderConfirmation/OrderConfirmationScreen";
import AddAddressScreen from "./addAddress/AddAddressScreen";
import SelectLocationScreen from "./selectLocation/SelectLocationScreen";
import RegistrationScreen from "./registration/RegistrationScreen";
import Translations from "../constants/Translations";

const Stack = createStackNavigator();

export default function Root() {
  const loggedIn = useSelector((state) => state.client.loggedIn);
  const newUser = useSelector((state) => state.client.newUser);
  const loading = useSelector((state) => state.client.loading);
  const error = useSelector((state) => state.client.error);
  const status = useSelector((state) => state.client.status);

  if (loading) {
    return null;
  }
  // return <RegistrationScreen />;
  if (loggedIn) {
    if (newUser) {
      return <RegistrationScreen />;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          mode={"modal"}
        >
          {/* <Stack.Screen name="Registration" component={RegistrationScreen} /> */}

          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
          <Stack.Screen
            name="OrderConfirmation"
            component={OrderConfirmationScreen}
            initialParams={{
              backText: Translations.t("homePage"),
            }}
          />
          <Stack.Screen name="AddAddress" component={AddAddressScreen} />
          <Stack.Screen
            name="SelectLocation"
            component={SelectLocationScreen}
          />
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
