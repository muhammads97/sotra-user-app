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
import Translations from "../../constants/Translations";
import { makeAddress, formatAddress } from "../../helpers/address";
import {
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native-gesture-handler";
import RoundEdgeButton from "../../components/button/RoundEdge";
import RadioButton from "../../components/RadioButton";
import { useSelector } from "react-redux";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const SBHeight = StatusBar.currentHeight;

export default function AddressSelector({
  onSelect,
  index,
  onExit,
  addresses,
  navigation,
}) {
  const rtl = useSelector((state) => state.client.rtl);
  const onPressAdd = () => {
    navigation.navigate("AddAddress", {
      backText: Translations.t("orderConfirmation"),
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0}
        style={styles.background}
        onPress={onExit}
      />
      <View style={styles.card}>
        <TouchableOpacity
          style={[styles.exit, rtl ? { left: 10 } : { right: 10 }]}
          onPress={onExit}
        >
          <Text style={styles.exitText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.selectAddress}>
          {Translations.t("selectAddress")}
        </Text>
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContainer}
        >
          {addresses.map((address, i) => {
            let addrText = formatAddress(address);
            return (
              <TouchableOpacity
                key={i}
                style={styles.addressBtn}
                onPress={() => onSelect(i)}
                activeOpacity={0.7}
              >
                <RadioButton selected={index == i} />
                <View style={styles.addressContainer}>
                  <Text style={styles.addressName}>{address.name}</Text>
                  <Text style={styles.address} numberOfLines={3}>
                    {addrText}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <RoundEdgeButton
          onPress={() => onPressAdd()}
          style={styles.button}
          text={Translations.t("addNewAddress")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addressContainer: {
    width: "87%",
  },

  addressBtn: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  list: {
    marginTop: 25,
    height: "70%",
    width: "90%",
    alignSelf: "center",
    // borderWidth: 1,
  },
  listContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  button: {
    alignSelf: "center",
  },
  selectAddress: {
    fontFamily: "poppins-regular",
    fontSize: 0.05 * screenWidth,
    width: "60%",
    color: Colors.back,
    margin: 20,
  },
  exit: {
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
  },
  exitText: {
    fontSize: 0.05 * screenWidth,
    fontFamily: "poppins-regular",
    color: Colors.back,
  },
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  background: {
    backgroundColor: "#000",
    opacity: 0.6,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  card: {
    height: "66%",
    width: "90%",
    backgroundColor: "#fff",
    elevation: 4,
    borderRadius: 0.033 * screenWidth,
  },
  addressName: {
    fontFamily: "poppins-regular",
    fontSize: 0.0444 * screenWidth,
    width: "100%",
    color: Colors.back,
  },
  address: {
    fontFamily: "poppins-light",
    fontSize: 0.0305 * screenWidth,
    color: Colors.back,
    width: "100%",
  },
});
