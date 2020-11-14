import * as React from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Alert,
  I18nManager,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import trans from "../../constants/Translations";

import { OTP4DigitsInput } from "../../components/OTPInput";
import { useDispatch, useSelector } from "react-redux";
import { resetRequestStatus, verify, login } from "../../redux/clientSlice";
import { isValidVerificationCode } from "../../helpers/phone";
import styles from "./style";
import Colors from "../../constants/Colors";

export default function VerificationScreen(props) {
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.client.phone);
  const status = useSelector((state) => state.client.status);
  const error = useSelector((state) => state.client.error);
  const maxTimer = 60;
  let currentTimer = 60;
  const [timerText, setTimerText] = React.useState("00 : 00");
  const [code, setCode] = React.useState("");
  const [activeResend, setActiveResend] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  let timer;

  if (status == "failed") {
    switch (error) {
      case "#E014":
        Alert.alert(
          trans.t("maximumAttempts"),
          trans.t("maxAtmpts"),
          [
            {
              text: trans.t("ok"),
            },
          ],
          {
            onDismiss: () => setDisabled(false),
          }
        );
        break;
      case "#E017":
        Alert.alert(trans.t("error"), trans.t("alreadyDelivery"), [
          {
            text: trans.t("ok"),
            onPress: () => setDisabled(false),
          },
        ]);
        break;
      case "#E012":
        Alert.alert(trans.t("error"), trans.t("loginAgain"), [
          {
            text: trans.t("ok"),
            onPress: () => setDisabled(false),
          },
        ]);
        break;
      case "#E013":
        Alert.alert(trans.t("error"), trans.t("wrongVCode"), [
          {
            text: trans.t("ok"),
            onPress: () => setDisabled(false),
          },
        ]);
        break;
      default:
        Alert.alert(trans.t("error"), trans.t("unknownError"), [
          {
            text: trans.t("ok"),
            onPress: () => setDisabled(false),
          },
        ]);
        break;
    }
    dispatch(resetRequestStatus());
  }
  const getTimerText = (seconds) => {
    let sec = seconds % 60;
    let min = parseInt(seconds / 60) % 60;
    sec = sec.toString();
    if (sec.length == 1) sec = "0" + sec;
    min = min.toString();
    if (min.length == 1) min = "0" + min;
    return min + " : " + sec;
  };
  const onPressSubmit = async () => {
    setDisabled(true);
    dispatch(resetRequestStatus());
    if (isValidVerificationCode(code)) {
      dispatch(verify({ phone, code }));
    } else {
      Alert.alert(trans.t("error"), trans.t("enterCorrectCode"));
      setDisabled(false);
    }
  };

  const resend = async () => {
    setActiveResend(false);
    startTimer();
    dispatch(login({ phone }));
  };

  const startTimer = () => {
    currentTimer = maxTimer;
    timer = setInterval(() => {
      const newTime = currentTimer - 1;
      if (newTime >= 0) {
        currentTimer = newTime;
        setTimerText(getTimerText(newTime));
      } else {
        clearInterval(timer);
        setActiveResend(true);
        setTimerText("00 : 00");
      }
    }, 1000);
  };
  React.useEffect(() => {
    dispatch(resetRequestStatus());
    Keyboard.dismiss();
    startTimer();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.verify}
          behavior={Platform.OS == "ios" ? "padding" : null}
        >
          <View style={styles.box}>
            <Text style={styles.verificationText}>
              {trans.t("verification")}
            </Text>
            <View style={styles.vertical}>
              <Text style={styles.mobileNumber}>{phone}</Text>
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.9}
              >
                <Text style={styles.wrongNumber}>{trans.t("wrongNumber")}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.card}>
            <OTP4DigitsInput
              onChangeText={(text) => setCode(text)}
              style={styles.input}
              rtl={I18nManager.isRTL}
            />
            <Text style={styles.code}>{trans.t("enterCode")}</Text>
            <View style={styles.resendBox}>
              <TouchableOpacity
                onPress={() => resend()}
                disabled={!activeResend}
                activeOpacity={0.9}
              >
                <Text
                  style={[
                    styles.resendText,
                    { opacity: activeResend ? 1 : 0.3 },
                  ]}
                >
                  {trans.t("resendSMS")}
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              {!activeResend ? (
                <Text style={styles.counter}>{timerText}</Text>
              ) : null}
            </View>
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => onPressSubmit()}
              activeOpacity={0.9}
              disabled={disabled}
            >
              <Text style={styles.buttonText}>{trans.t("submit")}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
