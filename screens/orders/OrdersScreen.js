import * as React from "react";
import { View, Text, RefreshControl } from "react-native";
import Header from "../../components/header/Header";
import Icons from "../../constants/Icons";
import Colors from "../../constants/Colors";
import Order from "./Order";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./style";
import RoundEdgeButton from "../../components/button/RoundEdge";

export default function OrdersScreen({ navigation, route }) {
  const rootNav = route.params.rootNav;
  const updateUser = route.params.updateUser;
  const backText = "Home Page";
  const headerText = "Orders";
  const [pickups, setPickups] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [headerElevation, setHeaderElevation] = React.useState(0);
  const [types, setTypes] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const getState = () => {
    if (pickups.length + orders.length == 0) return 0;
    if (pickups.length + orders.length == 1) return 1;
    if (pickups.length + orders.length > 1) return 2;
  };

  const load = async () => {
    let p = await globalThis.client.getPickups();
    let o = await globalThis.client.getOrders();
    if (o.length == 0) {
      p[p.length - 1].last = true;
    } else {
      o[o.length - 1].last = true;
    }
    let itemsTypes = await globalThis.client.getPriceList();
    let t = {};
    for (let i = 0; i < itemsTypes.length; i++) {
      t[itemsTypes[i].id] = itemsTypes[i];
    }
    setTypes(t);
    setPickups(p);
    setOrders(o);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  const orderNow = () => {
    rootNav.navigate("SelectAddress", {
      backName: "Orders",
      refresh: () => load(),
      updateUser: updateUser,
    });
  };

  const onScroll = (offset) => {
    if (offset.y == 0) {
      setHeaderElevation(0);
    } else if (headerElevation == 0) {
      setHeaderElevation(5);
    }
  };
  const cancelPickup = (id) => {
    let copy = [...pickups];
    let index = 0;
    while (index < copy.length) {
      if (copy[index].id == id) {
        break;
      }
      index++;
    }
    if (index < copy.length) {
      copy.splice(index, 1);
      setPickups(copy);
    }
  };
  const goToMap = (lat, long) => {
    navigation.navigate("Locations", {
      position: {
        latitude: lat,
        longitude: long,
      },
      rootNav: rootNav,
    });
  };
  return (
    <View style={styles.container}>
      <Header
        nav={rootNav}
        backText={backText}
        backTo={"Home"}
        elevation={headerElevation}
        text={headerText}
        icon={Icons.orders.home}
        style={{ backgroundColor: Colors.orders }}
        iconStyle={styles.headerIcon}
        textStyle={styles.headerText}
      />
      {getState() == 0 ? (
        <>
          <Text style={styles.epmtyText}>
            You don't have any orders yet. Order Now!
          </Text>
          <RoundEdgeButton
            style={{ backgroundColor: Colors.orders }}
            text={"Order Now"}
            onPress={() => orderNow()}
          />
        </>
      ) : (
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{
            width: "100%",
            alignItems: "center",
            flexGrow: 1,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={(e) => onScroll(e.nativeEvent.contentOffset)}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
        >
          {pickups.map((p, index) => {
            return (
              <Order
                order={p}
                key={index}
                dateBar={getState() == 2}
                cancelPickup={(id) => cancelPickup(id)}
                goToMap={(lat, long) => goToMap(lat, long)}
                pickup={true}
              />
            );
          })}
          {orders.map((o, index) => {
            return (
              <Order
                order={o}
                key={index}
                dateBar={getState() == 2}
                goToMap={(lat, long) => goToMap(lat, long)}
                types={types}
              />
            );
          })}
          <RoundEdgeButton
            style={{ backgroundColor: Colors.orders }}
            text={"Order Now"}
            onPress={() => orderNow()}
          />
        </ScrollView>
      )}
    </View>
  );
}
