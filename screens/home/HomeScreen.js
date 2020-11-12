import * as React from "react";
import { View, Image, Text, StatusBar } from "react-native";
import Icons from "../../constants/Icons";
import RoundEdgeButton from "../../components/button/RoundEdge";
import Translations from "../../constants/Translations";
import styles from "./style";
import ButtonsSection from "./ButtonsSection";
import { useDispatch, useSelector } from "react-redux";
import { resetRequestStatus, loadClient } from "../../redux/clientSlice";

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.client.name);
  const status = useSelector((state) => state.client.status);
  const error = useSelector((state) => state.client.error);
  const direction = useSelector((state) => state.client.direction);
  const textRtl = direction == "rtl" && {
    textAlign: "right",
    writingDirection: "rtl",
  };
  const viewRtl = direction == "rtl" && { flexDirection: "row-reverse" };

  if (status == "failed") {
    console.log("home screen:", error);
  }

  const orderNow = () => {
    props.navigation.navigate("OrderConfirmation");
  };
  React.useEffect(() => {
    dispatch(resetRequestStatus());
    dispatch(loadClient());
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
