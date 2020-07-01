import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ToastAndroid,
  StatusBar,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import * as Colors from "../constants/Colors";
import { LoginService } from "../hooks/loginEngine";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const mb = Math.round(0.065 * screenWidth);

export default class LoginScreen extends React.Component {
  constructor({ navigation, route }) {
    super();
    this.state = {
      phone: "",
      username: "",
    };
    this.phoneInput = React.createRef();
    this.navigation = navigation;
    this.onLogin = route.params.onLogin;
  }
  phoneHandler(text) {
    this.setState({ phone: text });
  }
  usernameHandler(text) {
    this.setState({ username: text });
  }
  async loginHandler() {
    let res = await globalThis.client.login(this.state.phone);
    if (res.sent) {
      this.navigation.navigate("Verify", {
        phone: this.state.phone,
        username: this.state.username,
        onLogin: this.onLogin,
      });
    } else {
      switch (res.error) {
        case "#E017":
          Alert.alert(
            "Invalid Number",
            "This number is already registered as a service provider.",
            [
              {
                text: "ok",
              },
            ]
          );
          break;
        case "#E":
          ToastAndroid.show("Please enter a valid number", ToastAndroid.LONG);
        default:
          ToastAndroid.show("error", ToastAndroid.LONG);
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.container}
        >
          <StatusBar hidden={true} />
          <View style={styles.login}>
            <View style={styles.logo}>
              <Image
                source={require("../assets/images/login-logo.png")}
                height={113}
                width={113}
                resizeMode={"contain"}
                style={styles.logoImage}
              />
            </View>
            <View style={styles.card}>
              <TextInput
                autoFocus={true}
                placeholder={"User Name"}
                style={styles.input1}
                onChangeText={(text) => this.usernameHandler(text)}
                scrollEnabled={false}
              />
              <TextInput
                style={styles.input2}
                placeholder={"Mobile Number"}
                keyboardType={"phone-pad"}
                ref={this.phoneInput}
                onChangeText={(text) => this.phoneHandler(text)}
                scrollEnabled={false}
              />
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => this.loginHandler()}
                activeOpacity={0.9}
              >
                <Text style={styles.buttonText}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default.primary,
  },
  login: {
    flex: 1,
    backgroundColor: Colors.default.primary,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: mb,
  },
  card: {
    backgroundColor: "#fff",
    height: 350,
    width: "87%",
    borderRadius: 49,
    elevation: 4,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    // height: screenHeight - mb - 350,
    flexGrow: 1,
    backgroundColor: Colors.default.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 113,
    height: 113,
  },
  input1: {
    marginTop: 88,
    height: 30,
    width: "77%",
    alignSelf: "center",
    borderBottomColor: Colors.default.input,
    borderBottomWidth: 1,
    fontFamily: "poppins-regular",
    fontSize: 20,
    textDecorationColor: Colors.default.input,
    color: Colors.default.input,
    opacity: 0.9,
  },
  input2: {
    marginTop: 38,
    height: 30,
    width: "77%",
    alignSelf: "center",
    borderBottomColor: Colors.default.input,
    borderBottomWidth: 1,
    fontFamily: "poppins-regular",
    fontSize: 20,
    textDecorationColor: Colors.default.input,
    color: Colors.default.input,
    letterSpacing: 0,
    opacity: 0.9,
  },
  loginButton: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderColor: Colors.default.primary,
    borderWidth: 1,
    marginTop: 76,
    width: "77%",
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 0.5,
  },
  buttonText: {
    color: Colors.default.primary,
    fontSize: 17,
    fontFamily: "poppins-regular",
  },
});
