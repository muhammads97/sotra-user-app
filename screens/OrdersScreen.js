import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import StickyHeader from "../components/StickyHeader";
import * as Icons from "../constants/Icons";
import * as Colors from "../constants/Colors";
import { Client } from "../hooks/Client";
import Rate from "../components/Rate";
import ProgressBar from "../components/Progress";
import Order from "../components/Order";
import { ScrollView } from "react-native-gesture-handler";
import { useScrollToTop } from "@react-navigation/native";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;
const headerHeight = 0.239 * screenHeight;
export default class OrdersScreen extends React.Component {
  constructor({ navigation, route }) {
    super();
    this.rootNav = route.params.rootNav;
    this.updateUser = route.params.updateUser;
    this.navigation = navigation;
    this.backName = "Home Page";
    this.headerText = "Orders";
    this.state = {
      pickups: [],
      orders: [],
      headerElevation: 0,
      types: {},
    };
  }
  getState() {
    if (this.state.pickups.length + this.state.orders.length == 0) return 0;
    if (this.state.pickups.length + this.state.orders.length == 1) return 1;
    if (this.state.pickups.length + this.state.orders.length > 1) return 2;
  }
  async componentDidMount() {
    let p = await globalThis.client.getPickups();
    let o = await globalThis.client.getOrders();
    if (o.length == 0) {
      p[p.length - 1].last = true;
    } else {
      o[o.length - 1].last = true;
    }

    this.setState({ pickups: p });
    this.setState({ orders: o });
    this.scroll.scrollTo({ y: 0, x: 0, animated: true });
    let itemsTypes = await globalThis.client.getPriceList();
    let types = {};
    for (let i = 0; i < itemsTypes.length; i++) {
      types[itemsTypes[i].id] = itemsTypes[i];
    }
    this.setState({ types: types });
  }

  renderHeader = () => {
    var Sticky_header_View = (
      <View style={styles.header}>
        <Text style={styles.headerText}>{this.headerText}</Text>
        <Image
          source={Icons.default.orders.home}
          resizeMode={"contain"}
          style={styles.headerIcon}
        />
      </View>
    );
    return Sticky_header_View;
  };
  emptyList = () => {
    return (
      <Text
        style={{
          width: "100%",
          textAlign: "center",
          fontFamily: "poppins-light",
          fontSize: 0.014 * screenHeight,
          color: Colors.default.back,
          margin: 0.02 * screenHeight,
        }}
      >
        You don't have any orders yet. Order Now!
      </Text>
    );
  };

  OrderNowButton = () => {
    return (
      <View style={[styles.footer, { marginBottom: 15 }]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onPressOrder()}
        >
          <Text style={styles.buttonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  onPressOrder() {
    this.rootNav.navigate("SelectAddress", {
      backName: "Orders",
      refresh: () => this.componentDidMount(),
      updateUser: this.updateUser,
    });
  }

  onScroll(offset) {
    if (offset.y == 0) {
      this.setState({ headerElevation: 0 });
    } else if (this.state.headerElevation == 0) {
      this.setState({ headerElevation: 5 });
    }
  }
  cancelPickup(id) {
    let copy = [...this.state.pickups];
    let index = 0;
    while (index < copy.length) {
      if (copy[index].id == id) {
        break;
      }
      index++;
    }
    if (index < copy.length) {
      copy.splice(index, 1);
      this.setState({ pickups: copy });
    }
  }
  goToMap(lat, long) {
    this.navigation.navigate("Locations", {
      position: {
        latitude: lat,
        longitude: long,
      },
      rootNav: this.rootNav,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <StickyHeader
          navigator={this.rootNav}
          backName={this.backName}
          backTo={"Home"}
          elevation={this.state.headerElevation}
          headerComponent={this.renderHeader()}
        />
        {this.getState() == 0 ? (
          <>
            {this.emptyList()}
            {this.OrderNowButton()}
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
            onScroll={(e) => this.onScroll(e.nativeEvent.contentOffset)}
            ref={(ref) => (this.scroll = ref)}
          >
            {this.state.pickups.map((p) => {
              return (
                <Order
                  order={p}
                  dateBar={this.getState() == 2}
                  cancelPickup={(id) => this.cancelPickup(id)}
                  goToMap={(lat, long) => this.goToMap(lat, long)}
                  pickup={true}
                />
              );
            })}
            {this.state.orders.map((o) => {
              return (
                <Order
                  order={o}
                  dateBar={this.getState() == 2}
                  goToMap={(lat, long) => this.goToMap(lat, long)}
                  types={this.state.types}
                />
              );
            })}
            {this.OrderNowButton()}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.default.orders,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 10,
    borderRadius: 0.0333 * screenWidth,
  },
  headerText: {
    fontFamily: "poppins-medium",
    fontSize: 0.03 * screenHeight,
    color: "#fff",
    marginLeft: "6.5%",
    marginTop: 2,
  },
  headerIcon: {
    width: 0.0835 * screenWidth,
    height: 0.087193 * screenWidth,
    position: "absolute",
    right: 0.032 * screenWidth,
  },
  scroll: {
    flexGrow: 1,
  },
  footer: {
    // height: 0.0578 * screenHeight + 60,
    flexGrow: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "poppins-regular",
    fontSize: 0.021 * screenHeight,
    color: "#fff",
  },
  button: {
    width: "66.66%",
    height: 0.0578125 * screenHeight,
    backgroundColor: Colors.default.orders,
    borderRadius: 0.02890625 * screenHeight,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    marginBottom: 30,
    marginTop: 30,
  },
});
