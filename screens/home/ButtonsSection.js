import * as React from "react";
import { View } from "react-native";
import SquareButton from "../../components/button/Square";
import styles from "./style";
import Icons from "../../constants/Icons";
import Colors from "../../constants/Colors";

export default function ButtonsSection({ nav, updateUser }) {
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
          iconStyle={styles.ordersIcon}
          text={"Your\nOrders"}
        />
        <SquareButton
          icon={Icons.pricing.home}
          style={{ backgroundColor: Colors.pricing }}
          onPress={() => onPressHandler(2, nav, updateUser)}
          iconStyle={styles.pricingIcon}
          text={"Pricing\nList"}
        />
      </View>

      <View style={[styles.subContainer, styles.rowContainer]}>
        <SquareButton
          icon={Icons.location.home}
          style={{ backgroundColor: Colors.locations }}
          onPress={() => onPressHandler(3, nav, updateUser)}
          iconStyle={styles.locationIcon}
          text={"Our\nLocations"}
        />
        <SquareButton
          icon={Icons.profile.home}
          style={{ backgroundColor: Colors.profile }}
          onPress={() => onPressHandler(4, nav, updateUser)}
          iconStyle={styles.ProfileIcon}
          text={"Profile\nSettings"}
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
        init: "Locations",
        rootNavigation: this.navigation,
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
