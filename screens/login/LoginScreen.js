import * as React from "react";
import {
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ToastAndroid,
  StatusBar,
} from "react-native";
import { alertE017 } from "../../helpers/alerts";
import styles from "./style";

export default function LoginScreen({ navigation, route }) {
  const onLogin = route.params.onLogin;
  const [phone, setPhone] = React.useState("");
  const [username, setUsername] = React.useState("");

  const login = async () => {
    let res = await globalThis.client.login(phone);
    if (res.sent) {
      navigation.navigate("Verify", {
        phone: phone,
        username: username,
        onLogin: onLogin,
      });
    } else {
      switch (res.error) {
        case "#E017":
          alertE017();
          break;
        case "#E":
          ToastAndroid.show("Please enter a valid number", ToastAndroid.LONG);
        default:
          ToastAndroid.show("error", ToastAndroid.LONG);
      }
    }
  };

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
              source={require("../../assets/images/login-logo.png")}
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
              onChangeText={(text) => setUsername(text)}
              scrollEnabled={false}
            />
            <TextInput
              style={styles.input2}
              placeholder={"Mobile Number"}
              keyboardType={"phone-pad"}
              onChangeText={(text) => setPhone(text)}
              scrollEnabled={false}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => login()}
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
