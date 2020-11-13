import * as React from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
  ToastAndroid,
  Alert,
  I18nManager,
} from "react-native";
import { adjustPhone, isValidPhoneNumber } from "../../helpers/phone";
import styles from "./style";
import trans from "../../constants/Translations";
import { useDispatch, useSelector } from "react-redux";
import { login, resetRequestStatus } from "../../redux/clientSlice";
import Colors from "../../constants/Colors";

export default function LoginScreen(props) {
  const dispatch = useDispatch();
  const loggingInStatus = useSelector((state) => state.client.loggingInStatus);
  const error = useSelector((state) => state.client.error);
  const [phone, setPhone] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const onClickLogin = async () => {
    setDisabled(true);
    let pNum = adjustPhone(phone);
    if (isValidPhoneNumber(pNum)) {
      dispatch(login({ phone: pNum }));
    } else {
      Alert.alert(trans.t("notValid"), trans.t("validNumberMsg"));
    }
    setDisabled(false);
  };

  if (loggingInStatus == "succeeded") {
    props.navigation.navigate("Verify");
  } else if (loggingInStatus == "failed") {
    switch (error) {
      case "#E014":
        Alert.alert(trans.t("maximumAttempts"), trans.t("maxAtmpts"));
        break;
      case "#E017":
        Alert.alert(trans.t("error"), trans.t("alreadyDelivery"));
        break;
      default:
        Alert.alert(trans.t("error"), trans.t("unknownError"));
        break;
    }
    dispatch(resetRequestStatus());
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <View style={styles.container}>
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
              style={[
                styles.input2,
                I18nManager.isRTL
                  ? { writingDirection: "rtl", textAlign: "right" }
                  : { writingDirection: "ltr" },
              ]}
              placeholder={trans.t("mobileNumber")}
              keyboardType={"phone-pad"}
              onChangeText={(text) => setPhone(text)}
              scrollEnabled={false}
              text
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => onClickLogin()}
              activeOpacity={0.9}
              disabled={disabled}
            >
              <Text style={styles.buttonText}>{trans.t("login")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
