import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import * as Colors from "../constants/Colors";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const SBHeight = StatusBar.currentHeight;

export default class PickupAddress extends React.Component {
  constructor() {
    super();
    this.state = {
      addressFont: 0.0305 * screenWidth,
    };
  }
  getAddress(address) {
    let building = address.building_number.toString();
    let streetAddress = address.street;
    let floor = address.floor.toString();
    let apt = address.apt.toString();
    let directions = address.additional_directions;
    address = "";
    if (building != null && building.length > 0) {
      address += building + " ";
    }
    if (streetAddress != null && streetAddress.length > 0) {
      address += streetAddress + ". ";
    }
    if (apt != null && apt.length > 0) {
      address += "Apartment NO. " + apt;
    }
    if (floor != null && floor.length > 0) {
      address += ", Floor NO. " + floor + ". ";
    }
    if (directions != null && directions.length > 0) {
      address += "(" + directions + ")";
    }
    return address;
  }

  reduceFont(l) {
    if (l.height > 44) {
      let f = this.state.addressFont - 0.5;
      this.setState({ addressFont: f });
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        activeOpacity={0.7}
        onPress={() => this.props.onPress()}
      >
        <View style={styles.textContainer}>
          <Text style={styles.addressName}>{this.props.address.name}</Text>
          <Text
            style={[styles.address, { fontSize: this.state.addressFont }]}
            // numberOfLines={2}
            onLayout={(e) => this.reduceFont(e.nativeEvent.layout)}
          >
            {this.getAddress(this.props.address)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 0.15625 * (screenHeight - SBHeight),
    width: "85.27%",
    borderRadius: 0.03333 * screenWidth,
    elevation: 4,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    // borderWidth: 1,
  },
  textContainer: {
    height: "66%",
    width: "90.8%",
    // justifyContent: "space-between",
    marginLeft: 0.03888 * screenWidth,
    // marginTop: "3%",
  },
  addressName: {
    fontFamily: "poppins-regular",
    fontSize: 0.0444 * screenWidth,
    height: "34.84%",
    width: "36.8%",
    color: Colors.default.back,
  },
  address: {
    fontFamily: "poppins-light",
    fontSize: 0.0305 * screenWidth,
    color: Colors.default.back,
    width: "100%",
    marginTop: "5%",
    // textAlignVertical: "center",
  },
});
