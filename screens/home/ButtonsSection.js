import * as React from "react";
import { View, Dimensions } from "react-native";
import SquareButton from "../../components/button/Square";
import styles from "./style";
import Icons from "../../constants/Icons";
import Colors from "../../constants/Colors";
import Translations from "../../constants/Translations";
import { useSelector } from "react-redux";
const screenWidth = Math.round(Dimensions.get("window").width);

export default function ButtonsSection({ nav, updateUser }) {
  const rtl = useSelector((state) => state.client.rtl);
  const iconMarginTop = {
    marginTop: rtl ? -0.01 * screenWidth : -0.05 * screenWidth,
  };
  return (
    <View style={styles.squareContainer}>
      <View
        style={[
          styles.subContainer,
          styles.rowContainer,
          { alignItems: "flex-start" },
        ]}
      >
        <SquareButton
          icon={Icons.orders.home}
          style={{ backgroundColor: Colors.orders }}
          onPress={() => onPressHandler(1, nav, updateUser)}
          iconStyle={[styles.ordersIcon, iconMarginTop]}
          text={Translations.t("ordersBtn")}
        />
        <SquareButton
          icon={Icons.pricing.home}
          style={{ backgroundColor: Colors.pricing }}
          onPress={() => onPressHandler(2, nav, updateUser)}
          iconStyle={[styles.pricingIcon, iconMarginTop]}
          text={Translations.t("pricingBtn")}
        />
      </View>

      <View style={[styles.subContainer, styles.rowContainer]}>
        <SquareButton
          icon={Icons.location.home}
          style={{ backgroundColor: Colors.locations }}
          onPress={() => onPressHandler(3, nav, updateUser)}
          iconStyle={[styles.locationIcon, iconMarginTop]}
          text={Translations.t("helpBtn")}
        />
        <SquareButton
          icon={Icons.profile.home}
          style={{ backgroundColor: Colors.profile }}
          onPress={() => onPressHandler(4, nav, updateUser)}
          iconStyle={[styles.ProfileIcon, iconMarginTop]}
          text={Translations.t("profileBtn")}
        />
      </View>
    </View>
  );
}

const onPressHandler = (button, navigation, updateUser) => {
  switch (button) {
    case 1:
      navigation.navigate("BottomTab", {
        init: "Orders",
        rootNavigation: navigation,
        updateUser: updateUser,
      });
      return;
    case 2:
      navigation.navigate("BottomTab", {
        init: "Pricing",
        rootNavigation: navigation,
        updateUser: updateUser,
      });
      return;
    case 3:
      navigation.navigate("BottomTab", {
        init: "Help",
        rootNavigation: navigation,
        updateUser: updateUser,
      });
      return;
    case 4:
      navigation.navigate("BottomTab", {
        init: "Profile",
        rootNavigation: navigation,
        updateUser: updateUser,
      });
      return;
    default:
      return;
  }
};
