import * as React from "react";
import { View, Text, Platform, TouchableOpacity, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FloatingTitleTextInputField from "../../components/inputs/FloatingPlaceholderTextInput";
import Icons from "../../constants/Icons";
import Header from "../../components/header/Header";
import styles from "./style";
import RoundEdgeButton from "../../components/button/RoundEdge";

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
    if (street.length == 0) {
      Alert.alert("Error", "please enter your street address.");
      return;
    }
    if (floor.length == 0) {
      Alert.alert("Error", "please specify which floor you live in.");
      return;
    }
    navigation.navigate("SelectLocation", {
      state: {
        name: name.length == 0 ? "Home" : name,
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
        scrollEventThrottle={16}
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
          <RoundEdgeButton
            text={"Save Address"}
            onPress={() => onPressSave()}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
