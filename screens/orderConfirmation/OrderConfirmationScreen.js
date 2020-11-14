import * as React from "react";
import {
  View,
  StatusBar,
  Text,
  Dimensions,
  Switch,
  TextInput,
  Alert,
  I18nManager,
} from "react-native";
import Header from "../../components/header/Header";
import RoundEdgeButton from "../../components/button/RoundEdge";
import Translations from "../../constants/Translations";
import Icons from "../../constants/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  resetRequestStatus,
  loadAddresses,
  setAddressesCached,
} from "../../redux/clientSlice";
import styles from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import Toggle from "../../components/Toggle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AddressSelector from "./addressSelector";
import { placeOrder, resetRequestStatusOrders } from "../../redux/ordersSlice";
const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;
export default function OrderConfirmationScreen(props) {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.client.addresses);
  const addressesCached = useSelector((state) => state.client.addressesCached);
  const orderingStatus = useSelector((state) => state.orders.ordering);
  const status = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  const balance = useSelector((state) => state.client.balance);
  const rtl = I18nManager.isRTL;

  const backText = props.route.params.backText;

  const [slot, setSlot] = React.useState(0);
  const [wallet, setWallet] = React.useState(true);
  const [addPromo, setAddPromo] = React.useState(false);
  const [promo, setPromo] = React.useState("");
  const [selector, setSelector] = React.useState(false);
  const [addressIndex, setAddressIndex] = React.useState(0);
  const [hasWeddingDress, setHasWeddingDress] = React.useState(false);

  if (orderingStatus == "placed") {
    dispatch(resetRequestStatusOrders());
    props.navigation.navigate("BottomTab", {
      init: "Orders",
      rootNavigation: props.navigation,
    });
  } else if (orderingStatus == "failed") {
    switch (error) {
      case "#E001":
        Alert.alert("Error", "You have already requested a pickup.");
        break;
      case "#E002":
        Alert.alert("Error", "No services available at this time.");
        break;
      case "#E003":
        Alert.alert("Error", "No services available in this area.");
        break;
      default:
        Alert.alert("Error", error);
        break;
    }
    dispatch(resetRequestStatusOrders());
  }

  const getTimeSlot = (type) => {
    if (addresses.length <= addressIndex) return "";
    if (addresses[addressIndex].time_slots == null) {
      setAddressIndex(addressIndex + 1);
      return "";
    }
    for (let i = 0; i < addresses[addressIndex].time_slots.length; i++) {
      if (addresses[addressIndex].time_slots[i].time_type == type) {
        return addresses[addressIndex].time_slots[i];
      }
    }
  };

  React.useEffect(() => {
    dispatch(resetRequestStatus());
    dispatch(resetRequestStatusOrders());
    if (!addressesCached) {
      dispatch(loadAddresses());
      dispatch(setAddressesCached(true));
    }
  }, []);

  const onPressConfirm = () => {
    if (addresses.length == 0) {
      Alert.alert(
        "No address selected",
        "Please select an address or add a new one."
      );
      return;
    }
    dispatch(
      placeOrder({
        address_index: addressIndex,
        promo,
        time_slot: slot == 0 ? getTimeSlot("morning") : getTimeSlot("night"),
        wallet,
        hasWeddingDress,
      })
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />

      <Header
        nav={props.navigation}
        elevation={10}
        icon={Icons.hanger}
        text={Translations.t("orderConfirmation")}
        iconStyle={[
          styles.headerIcon,
          // rtl ? { left: 0.05 * screenWidth } : { right: 0.05 * screenWidth },
        ]}
        backText={backText}
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
              height: 0,
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
                { borderTopStartRadius: 0.03333 * screenWidth },
              ]}
              onPress={() => setSlot(0)}
            >
              <Text style={styles.optionsText}>
                {Translations.t("morning")}
              </Text>
              {addresses.length == 0 ? null : (
                <Text style={styles.timeText}>{`${
                  getTimeSlot("morning").from
                } ~ ${getTimeSlot("morning").to} AM`}</Text>
              )}
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
                { borderTopEndRadius: 0.03333 * screenWidth },
              ]}
              onPress={() => setSlot(1)}
            >
              <Text style={styles.optionsText}>{Translations.t("night")}</Text>
              {addresses.length == 0 ? null : (
                <Text style={styles.timeText}>{`${
                  getTimeSlot("night").from
                } ~ ${getTimeSlot("night").to} PM`}</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.addressHolder}>
            <Text style={styles.addressName}>{Translations.t("address")}:</Text>
            {addresses.length > 0 ? (
              <Text style={styles.addressName}>
                {addresses[addressIndex].name}
              </Text>
            ) : null}
            <RoundEdgeButton
              style={styles.changeAddressBtn}
              text={Translations.t("change")}
              onPress={() => setSelector(true)}
              textStyle={styles.changeBtnText}
            />
          </View>
        </View>
        <View style={styles.walletCard}>
          <View style={[styles.walletHalf, { borderRightWidth: 1 }]}>
            <Text style={styles.balance}>{Translations.t("balance")}</Text>
            <Text style={styles.balanceAmount}>{`${balance} ${Translations.t(
              "LE"
            )}`}</Text>
          </View>
          <View style={styles.walletHalf}>
            <Text style={styles.balance}>{Translations.t("useWallet")}</Text>
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
          <Text style={styles.addressName}>{Translations.t("addPromo")}</Text>
          {addPromo ? (
            <TextInput
              style={styles.promoInput}
              value={promo}
              placeholder={Translations.t("promocode")}
              onChangeText={(value) => setPromo(value)}
            />
          ) : null}
        </TouchableOpacity>
        <View style={styles.row}>
          <View>
            <Text style={styles.wedding}>{Translations.t("wedding")}</Text>
          </View>
          {Platform.OS == "ios" ? (
            <Switch
              trackColor={{ false: Colors.track.off, true: Colors.track.on }}
              ios_backgroundColor={Colors.track.off}
              value={hasWeddingDress}
              onValueChange={(value) => setHasWeddingDress(value)}
            />
          ) : (
            <Toggle
              style={styles.toggleSmall}
              trackColor={{
                on: Colors.track.on,
                off: Colors.track.off,
              }}
              value={hasWeddingDress}
              onValueChange={(value) => setHasWeddingDress(value)}
              thumbColor={"#fff"}
            />
          )}
        </View>
        <View style={styles.btnContainer}>
          <RoundEdgeButton
            style={styles.confirmationBtn}
            text={Translations.t("confirmOrder")}
            onPress={() => onPressConfirm()}
          />
        </View>
      </KeyboardAwareScrollView>
      {selector ? (
        <AddressSelector
          onExit={() => setSelector(false)}
          addresses={addresses}
          onSelect={(i) => {
            if (
              addresses[i].time_slots == null ||
              addresses[i].time_slots.length == 0
            ) {
              Alert.alert(
                "No Service",
                "No Services Available in this Location"
              );
            } else {
              setAddressIndex(i);
            }
            setSelector(false);
          }}
          index={addressIndex}
          navigation={props.navigation}
        />
      ) : null}
    </View>
  );
}
