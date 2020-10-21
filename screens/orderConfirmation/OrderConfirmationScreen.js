import * as React from "react";
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  Dimensions,
  Image,
  Switch,
  TextInput,
} from "react-native";
import Header from "../../components/header/Header";
import RoundEdgeButton from "../../components/button/RoundEdge";
import Icons from "../../constants/Icons";
import { useDispatch, useSelector } from "react-redux";
import { resetRequestStatus, loadAddresses } from "../../redux/clientSlice";
import styles from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import Toggle from "../../components/Toggle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;
export default function OrderConfirmationScreen(props) {
  const dispatch = useDispatch();

  const addresses = useSelector((state) => state.client.addresses);
  const balance = useSelector((state) => state.client.balance);

  const [addressIndex, setAddressIndex] = React.useState(null);
  const [addressFont, setAddressFont] = React.useState(0.035 * screenWidth);
  const [slot, setSlot] = React.useState(0);
  const [wallet, setWallet] = React.useState(true);
  const [addPromo, setAddPromo] = React.useState(false);
  const [promo, setPromo] = React.useState("");

  React.useEffect(() => {
    dispatch(resetRequestStatus());
    dispatch(loadAddresses());
  }, []);

  const onPressAdd = () => {
    props.navigation.navigate("AddAddress", {
      headerText: "Add Address",
      backText: "Pickup Address",
      onBack: () => loadAddresses(),
    });
  };

  const reduceFont = (l) => {
    if (l.height > 44) {
      let f = addressFont - 0.5;
      setAddressFont(f);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />

      <Header
        nav={props.navigation}
        elevation={10}
        icon={Icons.hanger}
        text={"Order Confirmation"}
        iconStyle={styles.headerIcon}
        backText={"back"}
      />

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === "ios"}
        style={styles.scroll}
        contentContainerStyle={styles.listContent}
        scrollEventThrottle={16}
      >
        {Platform.OS == "ios" ? (
          <View
            style={{
              height: 25,
              width: "100%",
            }}
          />
        ) : null}
        <View style={styles.addressesPanel}>
          <View style={styles.options}>
            <TouchableOpacity
              style={[
                styles.timeSlot,
                slot == 0
                  ? {
                      backgroundColor: Colors.bar.inactive,
                      borderRightWidth: 0.5,
                    }
                  : {},
              ]}
              onPress={() => setSlot(0)}
            >
              <Text style={styles.optionsText}>Morning</Text>
              <Text style={styles.timeText}>10 ~ 10:30 AM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.timeSlot,
                slot == 1
                  ? {
                      backgroundColor: Colors.bar.inactive,
                      borderLeftWidth: 0.5,
                    }
                  : {},
              ]}
              onPress={() => setSlot(1)}
            >
              <Text style={styles.optionsText}>Night</Text>
              <Text style={styles.timeText}>7 ~ 7:30 PM</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressHolder}>
            <Text style={styles.addressName}>Address:</Text>
            <Text style={styles.addressName}>Home</Text>
            <RoundEdgeButton
              style={styles.changeAddressBtn}
              text={"Change"}
              onPress={() => console.log("pressed")}
              textStyle={styles.changeBtnText}
            />
          </View>
        </View>
        <View style={styles.walletCard}>
          <View style={[styles.walletHalf, { borderRightWidth: 1 }]}>
            <Text style={styles.balance}>Balance</Text>
            <Text style={styles.balanceAmount}>65.50 L.E</Text>
          </View>
          <View style={styles.walletHalf}>
            <Text style={styles.balance}>Use Wallet</Text>
            {Platform.OS == "ios" ? (
              <Switch
                trackColor={{ false: Colors.track.off, true: Colors.track.on }}
                ios_backgroundColor={Colors.track.off}
                value={wallet}
                onValueChange={(value) => setWallet(value)}
              />
            ) : (
              <Toggle
                style={styles.toggle}
                trackColor={{
                  on: Colors.track.on,
                  off: Colors.track.off,
                }}
                value={wallet}
                onValueChange={(value) => setWallet(value)}
                thumbColor={"#fff"}
              />
            )}
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.promoCard,
            addPromo ? { height: 0.18 * screenHeight } : {},
          ]}
          activeOpacity={0.7}
          onPress={() => setAddPromo(!addPromo)}
        >
          <Text style={styles.addressName}>Add Promocode</Text>
          {addPromo ? (
            <TextInput
              style={styles.promoInput}
              value={promo}
              placeholder={"Promo Code"}
              onChangeText={(value) => setPromo(value)}
            />
          ) : null}
        </TouchableOpacity>
        <View style={styles.btnContainer}>
          <RoundEdgeButton
            style={styles.confirmationBtn}
            text={"Confirm Order"}
            onPress={() => onPressAdd()}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
