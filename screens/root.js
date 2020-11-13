import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
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
import ForceUpdate from "./ForceUpdate";
import Constants from "expo-constants";
import { loadConfig } from "../redux/clientSlice";

const Stack = createStackNavigator();

export default function Root() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.client.loggedIn);
  const newUser = useSelector((state) => state.client.newUser);
  const loading = useSelector((state) => state.client.loading);
  const error = useSelector((state) => state.client.error);
  const status = useSelector((state) => state.client.status);
  const config = useSelector((state) => state.client.config);

  const isAboveMinimumVersion = () => {
    if (config.min_version == null) return true;
    let current_version = Constants.manifest.version.split(".");
    let minimum_version = config.min_version.split(".");
    if (parseInt(current_version[0]) > parseInt(minimum_version[0])) {
      return true;
    } else if (parseInt(current_version[0]) == parseInt(minimum_version[0])) {
      if (parseInt(current_version[1]) > parseInt(minimum_version[1])) {
        return true;
      } else if (parseInt(current_version[1]) == parseInt(minimum_version[1])) {
        if (parseInt(current_version[2]) >= parseInt(minimum_version[2])) {
          return true;
        }
      }
    }
    return false;
  };

  React.useEffect(() => {
    if (config.min_version == null) {
      dispatch(loadConfig({ key: "min_version" }));
    }
  }, []);
  if (loading) {
    return null;
  }

  if (!isAboveMinimumVersion()) {
    return <ForceUpdate />;
  }

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
