import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StickyHeader from "../components/header/StickyHeader";
import FloatingTitleTextInputField from "../components/FloatingPlaceholderTextInput";
import Colors from "../constants/Colors";
import Icons from "../constants/Icons";
import { TextInput } from "react-native-gesture-handler";
import Header from "../components/header/Header";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;

export default class AddAddressScreen extends React.Component {
  constructor({ navigation, route }) {
    super();
    this.navigation = navigation;
    this.backName = route.params.backName;
    this.headerText = route.params.headerText;
    this.onBack = route.params.onBack;
    this.state = {
      name: "",
      street: "",
      building: "",
      floor: "",
      apt: "",
      dir: "",
    };
  }

  // renderHeader = () => {
  //   var Sticky_header_View = (
  //     <View style={styles.header}>
  //       <Text style={styles.headerText}>{this.headerText}</Text>
  //       <Image
  //         source={Icons.default.hanger}
  //         resizeMode={"contain"}
  //         style={styles.headerIcon}
  //       />
  //     </View>
  //   );
  //   return Sticky_header_View;
  // };

  onChangeName(text) {
    this.setState({ name: text });
  }
  onChangeStreet(text) {
    this.setState({ street: text });
  }
  onChangeBuilding(text) {
    this.setState({ building: text });
  }
  onChangeFloor(text) {
    this.setState({ floor: text });
  }
  onChangeApt(text) {
    this.setState({ apt: text });
  }
  onChangeDir(text) {
    this.setState({ dir: text });
  }
  onPressSave() {
    if (this.state.name.length == 0) {
      this.setState({ name: "Home" });
    }
    if (this.state.street.length == 0) {
      ToastAndroid.show("please enter your street address.", ToastAndroid.LONG);
      return;
    }
    if (this.state.floor.length == 0) {
      ToastAndroid.show(
        "please specify which floor you live in.",
        ToastAndroid.LONG
      );
      return;
    }
    this.navigation.navigate("SelectLocation", {
      state: this.state,
      backName: "Add Address",
      headerText: "Select Location",
      onBack: this.onBack,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          nav={this.navigation}
          backText={this.backName}
          elevation={0}
          icon={Icons.hanger}
          text={this.headerText}
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
            onChangeText={(text) => this.onChangeName(text)}
          ></FloatingTitleTextInputField>
          <FloatingTitleTextInputField
            title={"Street Address"}
            onChangeText={(text) => this.onChangeStreet(text)}
          ></FloatingTitleTextInputField>
          <FloatingTitleTextInputField
            title={"Building Number"}
            onChangeText={(text) => this.onChangeBuilding(text)}
          ></FloatingTitleTextInputField>
          <FloatingTitleTextInputField
            title={"Floor"}
            onChangeText={(text) => this.onChangeFloor(text)}
          ></FloatingTitleTextInputField>
          <FloatingTitleTextInputField
            title={"Appartment Number"}
            onChangeText={(text) => this.onChangeApt(text)}
          ></FloatingTitleTextInputField>
          <FloatingTitleTextInputField
            title={"Additional Directions"}
            onChangeText={(text) => this.onChangeDir(text)}
          ></FloatingTitleTextInputField>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => this.onPressSave()}
            >
              <Text style={styles.buttonText}>Save Address</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    // justifyContent: "center",
    alignItems: "center",
    // paddingTop: SBHeight,
    // borderWidth: 1,
  },
  scroll: {
    flex: 1,
    width: "100%",
    // backgroundColor: "#fff",
    // borderWidth: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    width: "100%",
    // height: "100%",
    alignItems: "center",
    // borderWidth: 2,
  },

  header: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 10,
    borderRadius: 0.0333 * screenWidth,
    // borderWidth: 3,
  },
  headerText: {
    fontFamily: "poppins-medium",
    fontSize: 0.0225 * screenHeight,
    color: "#fff",
    marginLeft: "6.5%",
  },
  headerIcon: {
    width: 0.197 * screenWidth,
    height: 0.16202 * screenWidth,
    position: "absolute",
    right: 0.018334 * screenWidth,
    top: 0.01375 * screenHeight,
  },
  buttonText: {
    fontFamily: "poppins-regular",
    fontSize: 0.022 * screenHeight,
    color: "#fff",
    top: 1,
  },
  button: {
    width: "66.66%",
    height: 0.0578125 * screenHeight,
    backgroundColor: Colors.primary,
    borderRadius: 0.02890625 * screenHeight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0.046875 * screenHeight,
    marginTop: 0.046875 * screenHeight,
    elevation: 2,
  },
  footer: {
    flexGrow: 1,
    width: "100%",
    // borderWidth: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
