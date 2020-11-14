import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  I18nManager,
} from "react-native";
import styles from "./style";
import Icons from "../../constants/Icons";
import Colors from "../../constants/Colors";
import trans from "../../constants/Translations";
import Header from "../../components/header/Header";
import { loadConfig } from "../../redux/clientSlice";
const screenWidth = Math.round(Dimensions.get("window").width);

export default function HelpScreen(props) {
  const dispatch = useDispatch();
  const rtl = I18nManager.isRTL;
  const config = useSelector((state) => state.client.config);
  const rootNav = props.route.params.rootNav;
  const [headerElevation, setHeaderElevation] = React.useState(0);
  const backText = trans.t("homePage");
  const headerText = trans.t("helpAndSupport");

  const adjustHeaderElevation = (offset) => {
    if (offset.y == 0 && headerElevation != 0) {
      setHeaderElevation(0);
    } else if (offset.y != 0 && headerElevation == 0) {
      setHeaderElevation(5);
    }
  };

  React.useEffect(() => {
    if (config.support_line == null) {
      dispatch(loadConfig({ key: "support_line" }));
    }
  }, []);

  const callSupport = () => {
    Linking.openURL(`tel:${config.support_line}`);
  };

  const msngerChat = () => {
    Linking.canOpenURL("fb-messenger://")
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          Linking.openURL("fb-messenger://user-thread/" + "113005707203726");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Header
        nav={rootNav}
        backText={backText}
        elevation={headerElevation}
        icon={Icons.location.home}
        style={{ backgroundColor: Colors.locations }}
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
        <View style={styles.howToUseCard}>
          <Text style={styles.howToUseTitle}>{trans.t("howToUse")}</Text>
          <Text style={styles.underTitle}>{trans.t("steps")}</Text>
          <View style={styles.step}>
            <Text style={[styles.stepNumber, { paddingStart: 15 }]}>1</Text>
            <Text
              style={[
                styles.stepText,
                I18nManager.isRTL
                  ? {
                      writingDirection: "rtl",
                      marginTop: -20,
                      width: 0.6 * screenWidth,
                    }
                  : null,
              ]}
            >
              {trans.t("step1")}
            </Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>2</Text>
            <Text
              style={[
                styles.stepText,
                I18nManager.isRTL
                  ? {
                      writingDirection: "rtl",
                      marginTop: -20,
                      width: 0.6 * screenWidth,
                    }
                  : null,
              ]}
            >
              {trans.t("step2")}
            </Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>3</Text>
            <Text
              style={[
                styles.stepText,
                I18nManager.isRTL
                  ? {
                      writingDirection: "rtl",
                      marginTop: -20,
                      width: 0.6 * screenWidth,
                    }
                  : null,
              ]}
            >
              {trans.t("step3")}
            </Text>
          </View>
        </View>
        <View style={styles.supportView}>
          <Text style={styles.supportText}>{trans.t("contactSupport")}</Text>
          <View style={styles.btns}>
            <TouchableOpacity
              style={styles.msngrBtn}
              activeOpacity={0.8}
              onPress={() => msngerChat()}
            >
              <Image
                source={Icons.messenger}
                resizeMode={"contain"}
                style={styles.msngrIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactUsButton}
              activeOpacity={0.8}
              onPress={() => callSupport()}
            >
              <Image
                source={Icons.call}
                resizeMode={"contain"}
                style={styles.contactUsIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
