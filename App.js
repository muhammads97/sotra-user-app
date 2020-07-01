import * as React from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SafeAreaProvider,
  initialWindowSafeAreaInsets,
} from "react-native-safe-area-context";

import LoadingManager from "./hooks/LoadingManagerService";
import LoginScreen from "./screens/LoginScreen";
import VerificationScreen from "./screens/VerificationScreen";
import HomeScreen from "./screens/HomeScreen";
import SelectAddressScreen from "./screens/SelectAddressScreen";
import AddAddressScreen from "./screens/AddAddressScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import SelectLocationScreen from "./screens/SelectLocationScreen";
import * as SplashScreen from "expo-splash-screen";
import { Client } from "./hooks/Client";

const Stack = createStackNavigator();

globalThis.client = new Client();

export default class SotraApp extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoadingComplete: false,
      loggedIn: false,
    };
    this.loadingManager = new LoadingManager();
  }

  loadingComplete(loggedIn) {
    this.setState({ loggedIn: loggedIn });
    this.setState({ isLoadingComplete: true }, async () => {
      await SplashScreen.hideAsync();
    });
  }

  async componentDidMount() {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    globalThis.client.prepareResources((loggedIn) =>
      this.loadingComplete(loggedIn)
    );
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return null;
    } else {
      return (
        // <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            mode={"modal"}
          >
            {this.state.loggedIn ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                  name="SelectAddress"
                  component={SelectAddressScreen}
                />
                <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
                <Stack.Screen name="AddAddress" component={AddAddressScreen} />
                <Stack.Screen
                  name="SelectLocation"
                  component={SelectLocationScreen}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  initialParams={{
                    onLogin: () => {
                      this.setState({ loggedIn: true });
                    },
                  }}
                />
                <Stack.Screen name="Verify" component={VerificationScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
        // </SafeAreaProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
