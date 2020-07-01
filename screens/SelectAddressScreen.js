import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  FlatList,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import PickupAddress from "../components/PickupAddressCard";
import StickyHeader from "../components/StickyHeader";
import * as Colors from "../constants/Colors";
import Icons from "../constants/Icons";
import { Client } from "../hooks/Client";
const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;

export default class SelectAddressScreen extends React.Component {
  constructor({ navigation, route }) {
    super();
    this.state = {
      addresses: [],
      headerElevation: 0,
    };
    this.refreshOrders = route.params.refresh;
    this.backName = route.params.backName;
    this.updateUser = route.params.updateUser;
    if (this.backName == null) this.backName = "Home Page";
    this.navigator = navigation;
  }
  async componentDidMount() {
    let addresses = await globalThis.client.getAddresses();
    if (addresses != null) {
      let l = [];
      for (let i = 0; i < addresses.length; i++) {
        let obj = { key: i, value: addresses[i] };
        l[i] = obj;
      }
      this.setState({ addresses: l });
    }
  }
  async refresh() {
    let addresses = await globalThis.client.getAddresses();
    if (addresses != null) {
      let l = [];
      for (let i = 0; i < addresses.length; i++) {
        let obj = { key: i, value: addresses[i] };
        l[i] = obj;
      }
      this.setState({ addresses: l });
    }
  }
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 17,
          width: "100%",
          backgroundColor: "#fff",
        }}
      />
    );
  };
  renderHeader = () => {
    var Sticky_header_View = (
      <View style={styles.header}>
        <Text style={styles.headerText}>Select Pickup Address</Text>
        <Image
          source={Icons.hanger}
          resizeMode={"contain"}
          style={styles.headerIcon}
        />
      </View>
    );

    return Sticky_header_View;
  };
  async onPressAddress(address) {
    let response = await globalThis.client.placeOrder(address);
    if (response.created) {
      setTimeout(() => {
        this.navigator.navigate("BottomTab", {
          init: "Orders",
          rootNavigation: this.navigator,
          updateUser: this.updateUser,
        });
        this.refreshOrders();
      }, 20);
    } else {
      if (response.error.message === "#E001") {
        Alert.alert(
          "Already requested",
          "You have already requested a pickup, please wait we will serve you shortly.",
          [
            {
              text: "Ok",
            },
          ]
        );
      } else if (response.error.message == "#E002") {
        Alert.alert(
          "No Available Services",
          "All services in your area are either closed or busy now, we will notify you when services are available.",
          [
            {
              text: "Ok",
            },
          ]
        );
      } else {
        Alert.alert(
          "No Services in your area",
          "There are no services in your area, we will make sure to reach your area as soon as possible. Thank you.",
          [
            {
              text: "Ok",
            },
          ]
        );
      }
    }
  }
  onPressAdd() {
    this.navigator.navigate("AddAddress", {
      headerText: "Add Address",
      backName: "Pickup Address",
      onBack: () => this.refresh(),
    });
  }

  adjustHeaderElevation(offset) {
    if (offset.y == 0 && this.state.headerElevation != 0) {
      this.setState({ headerElevation: 0 });
    } else if (offset.y > 0 && this.state.headerElevation == 0) {
      this.setState({ headerElevation: 5 });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
        <StickyHeader
          navigator={this.navigator}
          backName={this.backName}
          elevation={this.state.headerElevation}
          headerComponent={this.renderHeader()}
        />
        <ScrollView
          contentContainerStyle={styles.listContent}
          style={styles.list}
          onScroll={(e) =>
            this.adjustHeaderElevation(e.nativeEvent.contentOffset)
          }
        >
          {this.state.addresses.map((item) => {
            return (
              <PickupAddress
                onPress={() => this.onPressAddress(item.value)}
                address={item.value}
                style={styles.addressCard}
              />
            );
          })}
          <View style={styles.buttonListItem}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onPressAdd()}
            >
              <Text style={styles.buttonText}>Add New Address</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    // alignItems: "center",
    // paddingTop: SBHeight,
    // borderWidth: 5,
  },
  list: {
    // borderWidth: 9,
  },
  listContent: {
    flexGrow: 1,
    width: "100%",
    // borderWidth: 1,
    // justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 5,
  },
  addressCard: {
    marginTop: 0.0125 * screenHeight,
    marginBottom: 0.0125 * screenHeight,
  },
  header: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.default.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 10,
    borderRadius: 0.0333 * screenWidth,
  },
  headerText: {
    fontFamily: "poppins-medium",
    fontSize: 0.0225 * screenHeight,
    color: "#fff",
    marginLeft: "6.5%",
  },
  headerIcon: {
    width: 0.197 * screenWidth,
    height: 0.16202 * screenWidth,
    position: "absolute",
    right: 0.018334 * screenWidth,
    top: 0.01375 * screenHeight,
    // marginTop: "5.5%",
    // marginLeft: "10%",
  },
  buttonListItem: {
    // height: 0.0578 * screenHeight + 60,
    flexGrow: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    // marginTop: 30,
    // borderWidth: 1,
  },
  buttonText: {
    fontFamily: "poppins-regular",
    fontSize: 0.019 * screenHeight,
    color: "#fff",
  },
  button: {
    width: "66.66%",
    height: 0.0578125 * screenHeight,
    backgroundColor: Colors.default.primary,
    borderRadius: 0.02890625 * screenHeight,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    marginTop: 25,
    marginBottom: 0.046875 * screenHeight,
  },
});
