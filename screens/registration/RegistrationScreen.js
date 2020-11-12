import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Image, StatusBar, Alert } from "react-native";
import styles from "./style";
import FloatingTitleTextInputField from "../../components/inputs/FloatingPlaceholderTextInput";
import RadioButton from "../../components/RadioButton";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import DatePicker from "react-native-datepicker";
import Colors from "../../constants/Colors";
import {
  resetRequestStatus,
  updateUserData,
  addReferralCode,
  makeOldUser,
} from "../../redux/clientSlice";
import Icons from "../../constants/Icons";
import RoundEdgeButton from "../../components/button/RoundEdge";

export default function RegistrationScreen(props) {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.client.referralStatus);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [referral, setReferral] = React.useState("");
  const [prompt, setPrompt] = React.useState(false);

  const onPressConfirm = () => {
    if (name == "") {
      Alert.alert("Empty Name!", "Please Enter Your Name.", [
        {
          text: "Ok",
        },
      ]);
    } else {
      const userData = {
        name,
        email,
        gender,
        birthDate,
      };
      dispatch(updateUserData({ userData }));
      dispatch(makeOldUser());
    }
  };

  const addReferral = () => {
    checkReferral();
    setPrompt(false);
  };

  const checkReferral = () => {
    dispatch(addReferralCode({ referral }));
  };

  React.useEffect(() => {
    dispatch(resetRequestStatus());
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <Text style={styles.headerText}>Complete your Registration</Text>
      <View style={styles.card}>
        <FloatingTitleTextInputField
          title={"Name"}
          onChangeText={(text) => setName(text)}
        />
        <FloatingTitleTextInputField
          title={"Email Address"}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.sectionTitle}>Gender</Text>
        <View style={styles.genderSection}>
          <TouchableOpacity
            style={styles.genderButton}
            activeOpacity={0.7}
            onPress={() => setGender("m")}
          >
            <RadioButton selected={gender == "m"} />
            <Text style={styles.gender}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.genderButton}
            activeOpacity={0.7}
            onPress={() => setGender("f")}
          >
            <RadioButton selected={gender == "f"} />
            <Text style={styles.gender}>Female</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Birth Date</Text>
        <DatePicker
          showIcon={false}
          androidMode="spinner"
          style={styles.datePicker}
          mode="date"
          placeholder="YYYY-MM-DD"
          format="YYYY-MM-DD"
          customStyles={{
            dateInput: {
              backgroundColor: "white",
              borderWidth: 0,
              borderBottomWidth: 1,
              borderRadius: 20,
              height: 45,
            },
            dateText: {
              fontFamily: "poppins-regular",
              color: Colors.input,
              fontSize: 15,
            },
            placeholderText: {
              fontFamily: "poppins-regular",
            },
          }}
          date={birthDate}
          onDateChange={(date) => setBirthDate(date)}
        />
        {status == "idle" ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPrompt(true)}
            style={styles.linkBox}
          >
            <Text style={styles.link}>Add Referral Code</Text>
          </TouchableOpacity>
        ) : status == "loading" ? (
          <Image
            source={Icons.loading}
            resizeMode={"contain"}
            style={styles.loading}
          />
        ) : status == "succeeded" ? (
          <Text style={styles.success}>Referral Code Added!</Text>
        ) : (
          <View style={styles.row}>
            <Text style={styles.failed}>Failed to add referral.</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setPrompt(true)}
            >
              <Text style={styles.link}>Try Again?</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.confirmationButton}
          onPress={() => onPressConfirm()}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
      {prompt ? (
        <View style={styles.overContainer}>
          <View style={styles.dark} onTouchEnd={() => setPrompt(false)} />
          <View style={styles.prompt}>
            <FloatingTitleTextInputField
              title={"Referral Code"}
              onChangeText={(text) => setReferral(text)}
            />
            <RoundEdgeButton
              style={{ backgroundColor: Colors.primary }}
              text={"Add Code"}
              textStyle={{ textAlign: "center" }}
              onPress={() => addReferral()}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}
