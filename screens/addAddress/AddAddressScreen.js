import * as React from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FloatingTitleTextInputField from "../../components/inputs/FloatingPlaceholderTextInput";
import Icons from "../../constants/Icons";
import Header from "../../components/header/Header";
import styles from "./style";

export default function AddAddressScreen({ navigation, route }) {
  const backText = route.params.backText;
  const headerText = route.params.headerText;
  const onBack = route.params.onBack;

  const [name, setName] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [building, setBuilding] = React.useState("");
  const [floor, setFloor] = React.useState("");
  const [apartment, setApartment] = React.useState("");
  const [directions, setDirections] = React.useState("");

  const onPressSave = () => {
    if (name.length == 0) {
      setName("Home");
    }
    if (street.length == 0) {
      ToastAndroid.show("please enter your street address.", ToastAndroid.LONG);
      return;
    }
    if (floor.length == 0) {
      ToastAndroid.show(
        "please specify which floor you live in.",
        ToastAndroid.LONG
      );
      return;
    }
    navigation.navigate("SelectLocation", {
      state: {
        name,
        street,
        building,
        floor,
        apartment,
        directions,
      },
      backName: "Add Address",
      headerText: "Select Location",
      onBack: onBack,
    });
  };

  return (
    <View style={styles.container}>
      <Header
        nav={navigation}
        backText={backText}
        elevation={0}
        icon={Icons.hanger}
        text={headerText}
        iconStyle={styles.headerIcon}
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === "ios"}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
      >
        <FloatingTitleTextInputField
          title={"Name (Home)"}
          onChangeText={(text) => setName(text)}
        ></FloatingTitleTextInputField>
        <FloatingTitleTextInputField
          title={"Street Address"}
          onChangeText={(text) => setStreet(text)}
        ></FloatingTitleTextInputField>
        <FloatingTitleTextInputField
          title={"Building Number"}
          onChangeText={(text) => setBuilding(text)}
        ></FloatingTitleTextInputField>
        <FloatingTitleTextInputField
          title={"Floor"}
          onChangeText={(text) => setFloor(text)}
        ></FloatingTitleTextInputField>
        <FloatingTitleTextInputField
          title={"Appartment Number"}
          onChangeText={(text) => setApartment(text)}
        ></FloatingTitleTextInputField>
        <FloatingTitleTextInputField
          title={"Additional Directions"}
          onChangeText={(text) => setDirections(text)}
        ></FloatingTitleTextInputField>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => onPressSave()}
          >
            <Text style={styles.buttonText}>Save Address</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
