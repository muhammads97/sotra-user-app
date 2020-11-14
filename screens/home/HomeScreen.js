import * as React from "react";
import { View, Image, Text, StatusBar } from "react-native";
import Icons from "../../constants/Icons";
import RoundEdgeButton from "../../components/button/RoundEdge";
import Translations from "../../constants/Translations";
import styles from "./style";
import ButtonsSection from "./ButtonsSection";
import { useDispatch, useSelector } from "react-redux";
import {
  resetRequestStatus,
  loadClient,
  setPushToken,
} from "../../redux/clientSlice";

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.client.name);
  const status = useSelector((state) => state.client.status);
  const error = useSelector((state) => state.client.error);
  const notification = useSelector((state) => state.client.notification);

  if (status == "failed") {
    console.log("home screen:", error);
  }
  if (notification != null) {
    const go_to = notification.data.go_to;
    switch (go_to) {
      case "orders":
        onPressHandler(1, props.navigation);
        break;
      case "pricing":
        onPressHandler(2, props.navigation);
        break;
      case "help":
        onPressHandler(3, props.navigation);
        break;
      case "profile":
        onPressHandler(4, props.navigation);
        break;
      case "order_now":
        props.navigation.navigate("OrderConfirmation");
        break;
      case "add_address":
        props.navigation.navigate("AddAddress", {
          backText: Translations.t("homePage"),
        });
        break;
    }
  }

  const orderNow = () => {
    props.navigation.navigate("OrderConfirmation");
  };
  React.useEffect(() => {
    dispatch(resetRequestStatus());
    dispatch(loadClient());
    dispatch(setPushToken());
  }, []);

  return (
    <View style={[styles.container]}>
      <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
      <View style={[styles.subContainer]}>
        <View style={[styles.welcome]}>
          <Text style={[styles.hello]}>
            {Translations.t("hello")}
            {Translations.t("comma")}
          </Text>
          <Text style={[styles.username]}>{name}</Text>
        </View>
      </View>
      <View style={[styles.subContainer]}>
        <View style={styles.message}>
          <View style={styles.messageText}>
            <Text style={styles.orderNowText}>
              {Translations.t("introMessage1")}
            </Text>
            <Text style={[styles.orderNowText, { letterSpacing: -0.5 }]}>
              {Translations.t("introMessage2")}
            </Text>
            <Text
              style={[styles.orderNowText, { fontFamily: "poppins-semi-bold" }]}
            >
              {Translations.t("introMessage3")}
            </Text>
          </View>
          <Image
            style={styles.hanger}
            source={Icons.hanger}
            resizeMode={"contain"}
          />
        </View>
        <RoundEdgeButton
          text={Translations.t("orderNow")}
          onPress={() => orderNow()}
        />
        <ButtonsSection nav={props.navigation} />
      </View>
    </View>
  );
}

const onPressHandler = (button, navigation) => {
  switch (button) {
    case 1:
      navigation.navigate("BottomTab", {
        init: "Orders",
        rootNavigation: navigation,
      });
      return;
    case 2:
      navigation.navigate("BottomTab", {
        init: "Pricing",
        rootNavigation: navigation,
      });
      return;
    case 3:
      navigation.navigate("BottomTab", {
        init: "Help",
        rootNavigation: navigation,
      });
      return;
    case 4:
      navigation.navigate("BottomTab", {
        init: "Profile",
        rootNavigation: navigation,
      });
      return;
    default:
      return;
  }
};
