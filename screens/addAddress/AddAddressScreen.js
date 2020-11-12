import * as React from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FloatingTitleTextInputField from "../../components/inputs/FloatingPlaceholderTextInput";
import Icons from "../../constants/Icons";
import Header from "../../components/header/Header";
import Translations from "../../constants/Translations";

import styles from "./style";
import RoundEdgeButton from "../../components/button/RoundEdge";
import { useDispatch, useSelector } from "react-redux";
import { resetRequestStatus } from "../../redux/clientSlice";
const screenWidth = Math.round(Dimensions.get("window").width);

export default function AddAddressScreen(props) {
  const dispatch = useDispatch();
  const rtl = useSelector((state) => state.client.rtl);
  const backText = props.route.params.backText;

  const [name, setName] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [building, setBuilding] = React.useState("");
  const [floor, setFloor] = React.useState("");
  const [apartment, setApartment] = React.useState("");
  const [directions, setDirections] = React.useState("");

  const onPressSave = () => {
    if (street.length == 0) {
      Alert.alert("Error", "please enter your street address.");
      return;
    }
    if (floor.length == 0) {
      Alert.alert("Error", "please specify which floor you live in.");
      return;
    }
    dispatch(resetRequestStatus());
    props.navigation.navigate("SelectLocation", {
      state: {
        name: name.length == 0 ? "Home" : name,
        street,
        building_number: building,
        floor,
        apt: apartment,
        additional_directions: directions,
      },
      backText: Translations.t("addAddress"),
    });
  };

  return (
    <View style={styles.container}>
      <Header
        nav={props.navigation}
        backText={backText}
        elevation={0}
        icon={Icons.hanger}
        text={Translations.t("addNewAddress")}
        iconStyle={[
          styles.headerIcon,
          rtl ? { left: 0.05 * screenWidth } : { right: 0.05 * screenWidth },
        ]}
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === "ios"}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
        scrollEventThrottle={16}
      >
        <FloatingTitleTextInputField
          title={Translations.t("addressName")}
          onChangeText={(text) => setName(text)}
        ></FloatingTitleTextInputField>
        <FloatingTitleTextInputField
          title={Translations.t("streetAddress")}
          onChangeText={(text) => setStreet(text)}
        ></FloatingTitleTextInputField>
        <FloatingTitleTextInputField
          title={Translations.t("buildingNumber")}
          onChangeText={(text) => setBuilding(text)}
        ></FloatingTitleTextInputField>
        <FloatingTitleTextInputField
          title={Translations.t("floor")}
          onChangeText={(text) => setFloor(text)}
        ></FloatingTitleTextInputField>
        <FloatingTitleTextInputField
          title={Translations.t("aptNumber")}
          onChangeText={(text) => setApartment(text)}
        ></FloatingTitleTextInputField>
        <FloatingTitleTextInputField
          title={Translations.t("additionalDir")}
          onChangeText={(text) => setDirections(text)}
        ></FloatingTitleTextInputField>
        <View style={styles.footer}>
          <RoundEdgeButton
            text={Translations.t("saveAddress")}
            onPress={() => onPressSave()}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
