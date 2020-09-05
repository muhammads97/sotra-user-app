import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingManager from "./hooks/LoadingManagerService";
import LoginScreen from "./screens/login/LoginScreen";
import VerificationScreen from "./screens/verification/VerificationScreen";
import HomeScreen from "./screens/home/HomeScreen";
import AddAddressScreen from "./screens/addAddress/AddAddressScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import SelectLocationScreen from "./screens/selectLocation/SelectLocationScreen";
import * as SplashScreen from "expo-splash-screen";
import { Client } from "./hooks/Client";
import SelectAddressScreen from "./screens/selectAddress/SelectAddressScreen";

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
