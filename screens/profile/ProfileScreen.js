import * as React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Alert,
  Dimensions,
  StatusBar,
  Switch,
  Platform,
  Share,
  Picker,
  I18nManager,
  ActionSheetIOS,
} from "react-native";
import Colors from "../../constants/Colors";
import Icons from "../../constants/Icons";
import trans from "../../constants/Translations";
import { makeAddress, formatAddress } from "../../helpers/address";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Toggle from "../../components/Toggle";
import Header from "../../components/header/Header";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAddresses,
  setAddressesCached,
  setCallBeforeDelivery,
  setName,
  deleteAddress,
  setLanguage,
  loadConfig,
} from "../../redux/clientSlice";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;

export default function ProfileScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.client.addresses);
  const addressesCached = useSelector((state) => state.client.addressesCached);
  const name = useSelector((state) => state.client.name);
  const cbd = useSelector((state) => state.client.call_before_delivery);
  const referralCode = useSelector((state) => state.client.referral_code);
  const balance = useSelector((state) => state.client.balance);
  const language = useSelector((state) => state.client.language);
  const rtl = I18nManager.isRTL;
  const config = useSelector((state) => state.client.config);
  const rootNav = route.params.rootNav;
  const [addressFont, setAddressFont] = React.useState(0.017 * screenHeight);
  const [headerElevation, setHeaderElevation] = React.useState(0);
  const backText = trans.t("homePage");
  const headerText = trans.t("profileSettings");

  const onPressAddAddress = () => {
    rootNav.navigate("AddAddress", {
      backText: "Profile Settings",
    });
  };

  const reduceFont = (l) => {
    if (l.height > 41) {
      let f = addressFont - 0.25;
      setAddressFont(f);
    }
  };

  const load = async () => {
    dispatch(loadAddresses());
  };

  React.useEffect(() => {
    if (!addressesCached) {
      load();
      dispatch(setAddressesCached(true));
    }
    if (config.referral_back_amount == null) {
      dispatch(loadConfig({ key: "referral_back_amount" }));
    }
    if (config.referral_out_amount == null) {
      dispatch(loadConfig({ key: "referral_out_amount" }));
    }
  }, []);

  const toggleCBD = (value) => {
    dispatch(setCallBeforeDelivery({ value }));
  };

  const updateName = async (name) => {
    dispatch(setName({ name }));
  };
  const onClickDeleteAddress = (index) => {
    Alert.alert(
      trans.t("delete") + " " + addresses[index].name + "?",
      trans.t("deleteConfirmMsg") + " (" + addresses[index].name + ")?",
      [
        {
          text: trans.t("delete"),
          onPress: () => {
            dispatch(deleteAddress({ index }));
          },
        },
        {
          text: trans.t("cancel"),
        },
      ]
    );
  };

  const adjustHeaderElevation = (offset) => {
    if (offset.y == 0 && headerElevation != 0) {
      setHeaderElevation(0);
    } else if (offset.y != 0 && headerElevation == 0) {
      setHeaderElevation(5);
    }
  };

  const shareReferral = () => {
    Share.share({
      title: trans.t("shareReferralTitle"),
      url: "https://play.google.com/store/apps/details?id=com.sotra.user",
      message:
        "https://play.google.com/store/apps/details?id=com.sotra.user\n" +
        trans.t("shareReferralMsg1") +
        trans.t("shareReferralMsg2") +
        referralCode +
        trans.t("shareReferralMsg3_1") +
        config.referral_out_amount +
        trans.t("shareReferralMsg3_2") +
        config.referral_back_amount +
        trans.t("shareReferralMsg3_3"),
    });
  };

  const openLanguageSelect = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [trans.t("english"), trans.t("arabic")],
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          if (language == "ar") dispatch(setLanguage({ language: "en" }));
        } else if (buttonIndex === 1) {
          if (language == "en") dispatch(setLanguage({ language: "ar" }));
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Header
        nav={rootNav}
        backText={backText}
        elevation={headerElevation}
        icon={Icons.profile.home}
        style={{ backgroundColor: Colors.profile }}
        textStyle={styles.headerText}
        text={headerText}
        iconStyle={[
          styles.headerIcon,
          // rtl ? { left: 0.05 * screenWidth } : { right: 0.05 * screenWidth },
        ]}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => adjustHeaderElevation(e.nativeEvent.contentOffset)}
        scrollEventThrottle={16}
      >
        <View style={styles.toggleView}>
          <Text style={styles.toggleText}>{trans.t("callBeforeDelivery")}</Text>
          {Platform.OS == "ios" ? (
            <Switch
              trackColor={{ false: Colors.track.off, true: Colors.track.on }}
              ios_backgroundColor={Colors.track.off}
              value={cbd}
              onValueChange={(value) => toggleCBD(value)}
            />
          ) : (
            <Toggle
              style={styles.toggle}
              trackColor={{
                on: Colors.track.on,
                off: Colors.track.off,
              }}
              value={cbd}
              onValueChange={(value) => toggleCBD(value)}
              thumbColor={"#fff"}
            />
          )}
        </View>
        <View style={styles.usernameView}>
          <Text style={styles.usernameText}>{trans.t("name")}</Text>
          <TextInput
            style={[
              styles.usernameInput,
              rtl
                ? { writingDirection: "rtl", textAlign: "right" }
                : { writingDirection: "ltr", textAlign: "left" },
            ]}
            value={name}
            placeholder={trans.t("yourName")}
            onChangeText={(value) => updateName(value)}
          />
        </View>
        <View style={styles.balanceView}>
          <View
            style={[
              styles.balanceSection,
              // rtl ? { borderLeftWidth: 1 } : { borderRightWidth: 1 },
            ]}
          >
            <Text style={styles.balanceText}>{trans.t("balance")}</Text>
            <Text style={styles.balanceText}>
              {balance} {trans.t("LE")}
            </Text>
          </View>
          <View style={styles.verticalSeparator} />
          <View style={styles.referralSection}>
            <Text style={styles.balanceText}>{trans.t("referralCode")}</Text>
            <Text style={styles.balanceText}>{referralCode}</Text>
            <TouchableOpacity
              style={[
                styles.shareBtn,
                rtl ? { marginRight: 140 } : { marginLeft: 140 },
              ]}
              activeOpacity={0.8}
              onPress={() => shareReferral()}
            >
              <Image
                style={styles.shareIcon}
                source={Icons.share}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.hint} numberOfLines={2}>
          {trans.t("referralDescription1") +
            config.referral_out_amount +
            trans.t("referralDescription2") +
            config.referral_back_amount +
            trans.t("referralDescription3")}
        </Text>
        <View style={[styles.addressesView]}>
          <View style={styles.addressesHeader}>
            <Text style={styles.addressesHeaderText}>
              {trans.t("addresses")}
            </Text>
            <TouchableOpacity
              style={styles.plusButton}
              activeOpacity={0.8}
              onPress={() => onPressAddAddress()}
            >
              <Image
                source={Icons.plus}
                style={styles.plusIcon}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>
          {addresses.length == 0 ? (
            <Text style={styles.noAddresses}>{trans.t("emptyAddresses")}</Text>
          ) : (
            <>
              {addresses.map((address, index) => {
                return (
                  <>
                    <View style={styles.addressContainer}>
                      <View style={styles.addressNameContainer}>
                        <Text style={styles.addressName}>{address.name}</Text>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          activeOpacity={0.8}
                          onPress={() => onClickDeleteAddress(index)}
                        >
                          <Image
                            source={Icons.delete}
                            resizeMode={"contain"}
                            style={styles.deleteIcon}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={[styles.address, { fontSize: addressFont }]}
                        onLayout={(e) => reduceFont(e.nativeEvent.layout)}
                      >
                        {formatAddress(address)}
                      </Text>
                    </View>
                  </>
                );
              })}
            </>
          )}
        </View>
        <View style={styles.languageView}>
          <Text style={styles.toggleText}>{trans.t("language")}</Text>
          {Platform.OS == "ios" ? (
            <TouchableOpacity
              style={styles.iosPicker}
              onPress={() => openLanguageSelect()}
              activeOpacity={0.8}
            >
              <Text style={styles.lang}>
                {language == "ar" ? trans.t("arabic") : trans.t("english")}
              </Text>
              <Image source={Icons.triangle} style={styles.dropdown} />
            </TouchableOpacity>
          ) : (
            <Picker
              selectedValue={language}
              style={{
                width: 150,
                color: Colors.back,
              }}
              onValueChange={(itemValue, itemIndex) =>
                dispatch(setLanguage({ language: itemValue }))
              }
            >
              <Picker.Item label={trans.t("english")} value="en" />
              <Picker.Item label={trans.t("arabic")} value="ar" />
            </Picker>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
