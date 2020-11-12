import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import OrdersScreen from "../screens/orders/OrdersScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import PricingScreen from "../screens/pricing/PricingScreen";
import { StyleSheet } from "react-native";
import * as Icons from "../constants/Icons";
import HelpScreen from "../screens/help/HelpAndSupportScreen";

const BottomTab = createBottomTabNavigator();

export default class BottomTabNavigator extends React.Component {
  constructor({ navigation, route }) {
    super();
    this.navigation = navigation;
    this.init = route.params.init;
    this.rootNavigation = route.params.rootNavigation;
  }

  render() {
    return (
      <BottomTab.Navigator
        initialRouteName={this.init}
        tabBarOptions={{
          style: styles.bar,
          safeAreaInsets: {
            bottom: 0,
          },
          showLabel: false,
        }}
        screenOptions={{
          rootNav: this.rootNavigation,
        }}
      >
        <BottomTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} icon={Icons.default.profile} />
            ),
          }}
          initialParams={{
            rootNav: this.rootNavigation,
            updateUser: this.updateUser,
          }}
        />
        <BottomTab.Screen
          name="Help"
          component={HelpScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} icon={Icons.default.location} />
            ),
          }}
          initialParams={{
            rootNav: this.rootNavigation,
          }}
        />
        <BottomTab.Screen
          name="Pricing"
          component={PricingScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} icon={Icons.default.pricing} />
            ),
          }}
          initialParams={{
            rootNav: this.rootNavigation,
          }}
        />
        <BottomTab.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} icon={Icons.default.orders} />
            ),
          }}
          initialParams={{
            rootNav: this.rootNavigation,
            updateUser: this.updateUser,
          }}
        />
      </BottomTab.Navigator>
    );
  }
}
const styles = StyleSheet.create({
  bar: {
    height: "8.9%",
    // borderWidth: 2,
    // elevation: 30,
  },
});
