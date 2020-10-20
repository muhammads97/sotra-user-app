import * as React from "react";
import {
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
  Alert,
  ToastAndroid,
} from "react-native";
import { adjustPhone, isValidPhoneNumber } from "../helpers/phone";
import { alertE017 } from "../../helpers/alerts";
import styles from "./style";
import { useDispatch } from "react-redux";
import { login, resetRequestStatus } from "../../redux/clientSlice";

export default function LoginScreen(props) {
  const dispatch = useDispatch();
  const loggingInStatus = useSelector((state) => state.client.loggingInStatus);
  const error = useSelector((state) => state.client.error);
  const [phone, setPhone] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  const onClickLogin = async () => {
    setDisabled(true);
    let pNum = adjustPhone(phone);
    if (isValidPhoneNumber(pNum)) {
      dispatch(login({ phone: pNum, name: username }));
    } else {
      ToastAndroid.show("Please enter a valid number", ToastAndroid.LONG);
    }
    setDisabled(false);
  };

  if (loggingInStatus == "succeeded") {
    props.navigation.navigate("Verify");
  } else if (loggingInStatus == "failed") {
    switch (error) {
      case "#E014":
        ToastAndroid.show("Maximum attempts exceeded", ToastAndroid.LONG);
        break;
      case "#E017":
        ToastAndroid.show(
          "This number is already registered as a delivery agent.",
          ToastAndroid.LONG
        );
        break;
      default:
        ToastAndroid.show("Error", ToastAndroid.LONG);
        console.log(error);
        break;
    }
    dispatch(resetRequestStatus());
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.container}
        scrollEventThrottle={16}
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
              onPress={() => onClickLogin()}
              activeOpacity={0.9}
              disabled={disabled}
            >
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
