import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import Colors from "../../constants/Colors";
import { makeAddress } from "../../helpers/address";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const SBHeight = StatusBar.currentHeight;

export default function PickupAddress({ style, onPress, address }) {
  const [addressFont, setAddressFont] = React.useState(0.0305 * screenWidth);

  const reduceFont = (l) => {
    if (l.height > 44) {
      let f = addressFont - 0.5;
      setAddressFont(f);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.textContainer}>
        <Text style={styles.addressName}>{address.name}</Text>
        <Text
          style={[styles.address, { fontSize: addressFont }]}
          onLayout={(e) => reduceFont(e.nativeEvent.layout)}
        >
          {makeAddress(address)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 0.15625 * (screenHeight - SBHeight),
    width: "85.27%",
    borderRadius: 0.03333 * screenWidth,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 10,
    shadowOpacity: 0.16,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  textContainer: {
    height: "66%",
    width: "90.8%",
    marginLeft: 0.03888 * screenWidth,
  },
  addressName: {
    fontFamily: "poppins-regular",
    fontSize: 0.0444 * screenWidth,
    height: "34.84%",
    width: "36.8%",
    color: Colors.back,
  },
  address: {
    fontFamily: "poppins-light",
    fontSize: 0.0305 * screenWidth,
    color: Colors.back,
    width: "100%",
    marginTop: "5%",
  },
});
