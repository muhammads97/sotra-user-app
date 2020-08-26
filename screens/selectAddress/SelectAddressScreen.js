import * as React from "react";
import { View, StatusBar, Alert, ScrollView } from "react-native";
import PickupAddress from "./PickupAddressCard";
import Header from "../../components/header/Header";
import RoundEdgeButton from "../../components/button/RoundEdge";
import Icons from "../../constants/Icons";
import styles from "./style";
import { alertE001, alertE002, alertE003 } from "../../helpers/alerts";

export default function SelectAddressScreen({ navigation, route }) {
  const [addresses, setAddresses] = React.useState([]);
  const [headerElevation, setHeaderElevation] = React.useState(0);
  const refreshOrders = route.params.refresh;
  let backText = route.params.backName;
  const updateUser = route.params.updateUser;
  if (backText == null) backText = "Home Page";

  const loadAddresses = () => {
    globalThis.client.getAddresses().then((adrs) => {
      if (adrs != null) {
        let l = [];
        for (let i = 0; i < adrs.length; i++) {
          let obj = { key: i, value: adrs[i] };
          l[i] = obj;
        }
        setAddresses(l);
      }
    });
  };

  React.useEffect(() => {
    loadAddresses();
  }, []);

  const onPressAddress = async (address) => {
    let response = await globalThis.client.placeOrder(address);
    if (response.created) {
      setTimeout(() => {
        navigation.navigate("BottomTab", {
          init: "Orders",
          rootNavigation: navigation,
          updateUser: updateUser,
        });
        refreshOrders();
      }, 20);
    } else {
      if (response.error.message === "#E001") {
        alertE001();
      } else if (response.error.message == "#E002") {
        alertE002();
      } else {
        alertE003();
      }
    }
  };
  const onPressAdd = () => {
    navigation.navigate("AddAddress", {
      headerText: "Add Address",
      backName: "Pickup Address",
      onBack: () => loadAddresses(),
    });
  };

  const adjustHeaderElevation = (offset) => {
    if (offset.y == 0 && headerElevation != 0) {
      setHeaderElevation(0);
    } else if (offset.y > 0 && headerElevation == 0) {
      setHeaderElevation(5);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
      <Header
        nav={navigation}
        backText={backText}
        elevation={headerElevation}
        icon={Icons.hanger}
        text={"Select Pickup Address"}
        iconStyle={styles.headerIcon}
      />
      <ScrollView
        contentContainerStyle={styles.listContent}
        style={styles.list}
        onScroll={(e) => adjustHeaderElevation(e.nativeEvent.contentOffset)}
      >
        {addresses.map((item) => {
          return (
            <PickupAddress
              onPress={() => onPressAddress(item.value)}
              address={item.value}
              style={styles.addressCard}
            />
          );
        })}
        <View style={styles.buttonListItem}>
          <RoundEdgeButton
            text={"Add New Address"}
            onPress={() => onPressAdd()}
          />
        </View>
      </ScrollView>
    </View>
  );
}
