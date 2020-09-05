import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import * as Colors from "../../constants/Colors";
import { OTP4DigitsInput } from "../../components/OTPInput";
import { LoginService } from "../../hooks/loginEngine";
import * as SecureStore from "expo-secure-store";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const mb = Math.round(0.065 * screenWidth);

export default class VerificationScreen extends React.Component {
  constructor({ navigation, route }) {
    super();
    this.phone = route.params.phone;
    this.username = route.params.username;
    this.onLogin = route.params.onLogin;
    this.state = {
      max: 60,
      current: 60,
      text: "00 : 00",
    };
    this.input = React.createRef();
    this.counterComp = React.createRef();
    this.navigation = navigation;
  }
  getTimerText(seconds) {
    let sec = seconds % 60;
    let min = parseInt(seconds / 60) % 60;
    sec = sec.toString();
    if (sec.length == 1) sec = "0" + sec;
    min = min.toString();
    if (min.length == 1) min = "0" + min;
    return min + " : " + sec;
  }
  async onPressSubmit() {
    if (this.input.current.getText().length != 4) {
      ToastAndroid.show("Please enter a correct code", ToastAndroid.LONG);
      return;
    }
    let res = await globalThis.client.verify(
      this.phone,
      this.input.current.getText()
    );
    if (res.ok) {
      await globalThis.client.submitUserName(this.username);
      this.onLogin();
    } else {
      switch (res.error) {
        case "#E013":
          ToastAndroid.show("Please enter a correct code", ToastAndroid.LONG);
          break;
        default:
          ToastAndroid.show("error", ToastAndroid.LONG);
          break;
      }
    }
  }

  async onPressResend() {
    let res = await globalThis.client.login(this.phone);
    this.startTimer();
    if (!res.sent) {
      switch (res.error) {
        case "#E017":
          Alert.alert(
            "Invalid Number",
            "This number is already registered as a service provider.",
            [
              {
                text: i18n.t("ok"),
              },
            ]
          );
          break;
        case "#E":
          ToastAndroid.show("Please enter a vslid number", ToastAndroid.LONG);
        default:
          ToastAndroid.show("error", ToastAndroid.LONG);
      }
    }
  }

  onPressWrongNumber() {
    this.navigation.goBack();
  }

  startTimer() {
    this.setState((prevState) => {
      return {
        ...prevState,
        current: prevState.max,
      };
    });
    this.timer = setInterval(() => {
      const newTime = this.state.current - 1;
      if (newTime >= 0) {
        this.setState({ current: newTime });
        this.setState({ text: this.getTimerText(newTime) });
      } else {
        clearInterval(this.timer);
        this.setState({ text: "00 : 00" });
      }
    }, 1000);
  }

  async componentDidMount() {
    this.startTimer();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.container}
        >
          <StatusBar hidden={true} />

          <View style={styles.verify}>
            <View style={styles.box}>
              <Text style={styles.verificationText}>Verification</Text>
              <View style={styles.vertical}>
                <Text style={styles.mobileNumber}>{this.phone}</Text>
                <TouchableOpacity
                  onPress={() => this.onPressWrongNumber()}
                  activeOpacity={0.9}
                >
                  <Text style={styles.wrongNumber}>Wrong number?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.card}>
              <OTP4DigitsInput ref={this.input} style={styles.input} />
              <Text style={styles.code}>Enter 4 Digits Code</Text>
              <View style={styles.resendBox}>
                <TouchableOpacity
                  onPress={() => this.onPressResend()}
                  disabled={this.state.current == 0 ? false : true}
                  activeOpacity={0.9}
                >
                  <Text
                    style={
                      this.state.current == 0
                        ? styles.resendText
                        : [styles.resendText, { opacity: 0.3 }]
                    }
                  >
                    Resend SMS
                  </Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                {this.state.current != 0 ? (
                  <Text style={styles.counter} ref={this.counterComp}>
                    {this.state.text}
                  </Text>
                ) : null}
              </View>
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={() => this.onPressSubmit()}
                activeOpacity={0.9}
              >
                <Text style={styles.buttonText}>Submit</Text>
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
  verify: {
    flex: 1,
    backgroundColor: Colors.default.primary,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: mb,
  },
  vertical: {
    flexDirection: "row",
    marginTop: -20,
  },
  mobileNumber: {
    fontFamily: "poppins-extra-light",
    fontSize: 15,
    color: "#fff",
    marginRight: 8,
  },
  wrongNumber: {
    fontFamily: "poppins-extra-light",
    fontSize: 15,
    color: "#fff",
    textDecorationLine: "underline",
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
  input: {
    height: 56,
    marginTop: 61,
    width: "75%",
  },
  box: {
    width: "100%",
    height: screenHeight - mb - 350,
    backgroundColor: Colors.default.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  verificationText: {
    fontFamily: "poppins-regular",
    fontSize: 45,
    color: "#fff",
  },
  verifyButton: {
    alignSelf: "center",
    borderColor: Colors.default.primary,
    borderWidth: 1,
    marginTop: 19,
    width: "77%",
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 0.5,
    backgroundColor: "#fff",
  },
  buttonText: {
    color: Colors.default.primary,
    fontSize: 17,
    fontFamily: "poppins-regular",
    marginTop: 2,
  },
  code: {
    fontFamily: "poppins-extra-light",
    fontSize: 10,
    color: Colors.default.input,
    marginTop: 10,
  },
  resendText: {
    fontFamily: "poppins-light",
    fontSize: 15,
    color: Colors.default.primary,
    textDecorationLine: "underline",
    marginBottom: 2,
  },
  resendBox: {
    flexDirection: "row",
    justifyContent: "center",
    width: "70%",
    height: 90,
    alignItems: "flex-end",
  },
  counter: {
    fontSize: 15,
    fontFamily: "poppins-light",
    color: Colors.default.input,
    marginRight: 3,
    marginBottom: 2,
  },
});
