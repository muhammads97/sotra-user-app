import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  AsyncStorage,
  ToastAndroid,
  StatusBar,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Colors from "../constants/Colors";
import * as Icons from "../constants/Icons";
import { Client } from "../hooks/Client";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;
export default class HomeScreen extends React.Component {
  constructor({ navigation, route }) {
    super();
    this.state = {
      name: "",
    };
    this.navigation = navigation;
  }

  async componentDidMount() {
    this.setState({ name: globalThis.client.getName() });
    globalThis.client.setupNotifications(this.navigation);
  }

  updateUser() {
    this.setState({ name: globalThis.client.getName() });
  }
  onPressHandler(button) {
    switch (button) {
      case 0:
        this.navigation.navigate("SelectAddress", {
          refresh: () => null,
        });
        return;
      case 1:
        this.navigation.navigate("BottomTab", {
          init: "Orders",
          rootNavigation: this.navigation,
          updateUser: () => this.updateUser(),
        });
        return;
      case 2:
        this.navigation.navigate("BottomTab", {
          init: "Pricing",
          rootNavigation: this.navigation,
          updateUser: () => this.updateUser(),
        });
        return;
      case 3:
        this.navigation.navigate("BottomTab", {
          init: "Locations",
          rootNavigation: this.navigation,
          updateUser: () => this.updateUser(),
        });
        return;
      case 4:
        this.navigation.navigate("BottomTab", {
          init: "Profile",
          rootNavigation: this.navigation,
          updateUser: () => this.updateUser(),
        });
        return;
      default:
        return;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
        <View style={[styles.subContainer]}>
          <View style={styles.welcome}>
            <Text style={styles.hello}>Hello,</Text>
            <Text style={styles.username}>{this.state.name}</Text>
          </View>
        </View>
        <View style={[styles.subContainer]}>
          <View style={styles.message}>
            <View style={styles.messageText}>
              <Text style={styles.orderNowText}>Order now,</Text>
              <Text style={[styles.orderNowText, { letterSpacing: -0.5 }]}>
                we will be on your door steps
              </Text>
              <Text
                style={[
                  styles.orderNowText,
                  { fontFamily: "poppins-semi-bold" },
                ]}
              >
                in less than 2 hours !
              </Text>
            </View>
            <Image
              style={styles.hanger}
              source={Icons.default.hanger}
              // width={0.32336 * screenWidth}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => this.onPressHandler(0)}
          >
            <Text style={styles.buttonText}>Order Now</Text>
          </TouchableOpacity>
          <View style={styles.squareContainer}>
            <View
              style={[
                styles.subContainer,
                styles.rowContainer,
                { alignItems: "flex-start" },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.card,
                  { backgroundColor: Colors.default.orders },
                ]}
                activeOpacity={0.7}
                onPress={() => this.onPressHandler(1)}
              >
                <View>
                  <Text style={styles.cardText}>Your{"\n"}Orders</Text>
                </View>
                <Image
                  style={styles.ordersIcon}
                  source={Icons.default.orders.home}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.card,
                  { backgroundColor: Colors.default.pricing },
                ]}
                activeOpacity={0.7}
                onPress={() => this.onPressHandler(2)}
              >
                <Text style={styles.cardText}>Pricing{"\n"}List</Text>
                <Image
                  style={styles.pricingIcon}
                  source={Icons.default.pricing.home}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.subContainer, styles.rowContainer]}>
              <TouchableOpacity
                style={[
                  styles.card,
                  { backgroundColor: Colors.default.locations },
                ]}
                activeOpacity={0.7}
                onPress={() => this.onPressHandler(3)}
              >
                <Text
                  style={[styles.cardText, { fontSize: 0.041 * screenWidth }]}
                >
                  Our{"\n"}Locations
                </Text>
                <Image
                  style={styles.locationIcon}
                  source={Icons.default.location.home}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.card,
                  { backgroundColor: Colors.default.profile },
                ]}
                activeOpacity={0.7}
                onPress={() => this.onPressHandler(4)}
              >
                <Text
                  style={[styles.cardText, { fontSize: 0.041 * screenWidth }]}
                >
                  Profile{"\n"}Settings
                </Text>
                <Image
                  style={styles.ProfileIcon}
                  source={Icons.default.profile.home}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ordersIcon: {
    width: 0.175 * screenWidth,
    height: 0.175 * screenWidth,
    // borderWidth: 1,
    alignSelf: "flex-end",
    marginRight: 0.04444 * screenWidth,
    marginTop: -0.04444 * screenWidth,
  },
  pricingIcon: {
    width: 0.17 * screenWidth,
    height: 0.175 * screenWidth,
    alignSelf: "flex-end",
    marginRight: 0.03 * screenWidth,
    marginTop: -0.04444 * screenWidth,
  },
  ProfileIcon: {
    width: 0.13 * screenWidth,
    height: 0.179 * screenWidth,
    alignSelf: "flex-end",
    marginRight: 0.04444 * screenWidth,
    marginTop: -0.04 * screenWidth,
  },
  locationIcon: {
    width: 0.12 * screenWidth,
    height: 0.172 * screenWidth,
    alignSelf: "flex-end",
    marginRight: 0.04444 * screenWidth,
    marginTop: -0.03 * screenWidth,
  },
  squareContainer: {
    aspectRatio: 1,
    width: "81%",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
    marginBottom: "2%",
  },
  rowContainer: {
    width: "100%",
    height: 0.378 * screenWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flex: 1,
  },
  cardText: {
    fontSize: 0.045 * screenWidth,
    fontFamily: "poppins-regular",
    color: "#fff",
    lineHeight: 0.052 * screenWidth,
    margin: 0.03333 * screenWidth,
    marginTop: 0.05 * screenWidth,
    letterSpacing: 0,
  },
  card: {
    aspectRatio: 1,
    width: 0.378 * screenWidth,
    borderRadius: 12,
    elevation: 2.5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  button: {
    backgroundColor: Colors.default.primary,
    width: "66.66%",
    height: 0.0578125 * screenHeight,
    borderRadius: 0.02890625 * screenHeight,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 0.0625 * screenHeight,
    marginBottom: 0.0625 * screenHeight,
  },
  buttonText: {
    fontFamily: "poppins-regular",
    color: "#fff",
    fontSize: 17,
    marginTop: 2,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    alignItems: "center",
    // borderWidth: 1,
  },
  subContainer: {
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    // borderWidth: 1,
  },
  hello: {
    fontFamily: "poppins-regular",
    fontSize: 0.032 * screenHeight,
    color: Colors.default.primary,
    marginLeft: 0.088889 * screenWidth + (0.05 * screenHeight) / 2,
    // borderWidth: 1,
    // textAlign: "center",
    flex: 1,
  },
  username: {
    fontFamily: "poppins-extra-light",
    fontSize: 0.032 * screenHeight,
    color: Colors.default.primary,
    // marginTop: -13,
    marginLeft: 0.088889 * screenWidth + (0.05 * screenHeight) / 2,
    // textAlignVertical: "bottom",
    // paddingTop: 10,
    // bottom: 10,
    // flexShrink: 1,
    // borderWidth: 1,
    flex: 1,
  },
  welcome: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    height: 0.089 * screenHeight,
  },
  message: {
    height: 0.146875 * screenHeight,
    width: "82.2%",
    backgroundColor: Colors.default.primary,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  orderNowText: {
    fontFamily: "poppins-regular",
    fontSize: 0.0155 * screenHeight,
    color: "#fff",
    width: "100%",
  },
  messageText: {
    height: "61.7%",
    width: "53.37%",
    justifyContent: "space-evenly",
    marginLeft: (0.05 * screenHeight) / 2,
  },
  hanger: {
    width: "39.19%",
    height: "101%",
    marginTop: (0.07 * screenHeight) / 2,
    marginLeft: -0.005 * screenWidth,
  },
});
