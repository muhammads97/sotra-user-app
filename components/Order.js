import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import * as Colors from "../constants/Colors";
import { Client } from "../hooks/Client";
import * as Months from "../constants/Months";
import Rate from "./Rate";
import ProgressBar from "./Progress";
import Icons from "../constants/Icons";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;

export default class Order extends React.Component {
  constructor(props) {
    super();
    this.state = {
      lineHeight: 200,
      title: "",
      price: "",
      address: "",
      date: "",
      progress: 0,
      cancelBtn: false,
      rate: 0,
      items: [],
      expand: false,
    };
  }

  makeAddress(address) {
    let building = address.building_number.toString();
    let streetAddress = address.street;
    let floor = address.floor.toString();
    let apt = address.apt.toString();
    let directions = address.additional_directions;
    address = "";
    if (building != null && building.length > 0) {
      address += building + " ";
    }
    if (streetAddress != null && streetAddress.length > 0) {
      address += streetAddress + ". ";
    }
    if (apt != null && apt.length > 0) {
      address += "Apartment NO. " + apt;
    }
    if (floor != null && floor.length > 0) {
      address += ", Floor NO. " + floor + ". ";
    }
    if (directions != null && directions.length > 0) {
      address += "(" + directions + ")";
    }
    return address;
  }

  async componentDidMount() {
    let items;
    if (this.props.order.status == "waiting") {
      this.setState({ title: "Waiting" });
      this.setState({ progress: 0 });
      this.setState({ cancelBtn: true });
    } else if (this.props.order.status == "picking") {
      this.setState({ title: "Picking" });
      this.setState({ progress: 1 });
    } else {
      items = await globalThis.client.getOrderItems(this.props.order.id);
      this.setState({ items: items });
      this.setState({ title: `${items.length} Items` });
      this.setState({ expandBtn: items.length > 0 });
      if (this.props.order.status == "serving") {
        this.setState({ progress: 2 });
      } else {
        this.setState({ progress: 3 });
      }
    }

    if (this.props.order.status == "archived") {
      let r = this.props.order.rating;
      this.setState({ rate: r == null ? 0 : r });
    }

    if (this.props.order.price != null) {
      this.setState({ price: this.props.order.price });
    }

    let addr = await globalThis.client.getAddress(this.props.order.address_id);
    addr = this.makeAddress(addr);
    this.setState({ address: addr });

    let dateStr = this.props.order.created_at;
    let date = new Date(dateStr);
    this.setState({
      date: date.getDate() + " " + Months.default[date.getMonth()],
    });
    if (items) {
      let itemsTypes = await globalThis.client.getPriceList();
      let types = {};
      for (let i = 0; i < itemsTypes.length; i++) {
        types[itemsTypes[i].id] = itemsTypes[i];
      }
      for (let i = 0; i < items.length; i++) {
        let p = 0;
        if (items[i].cleaning) p += types[items[i].item_id].cleaning_price;
        if (items[i].ironing) p += types[items[i].item_id].ironing_price;
        items[i].price = p;
        items[i].name = types[items[i].item_id].name;
      }
      this.setState({ items: items });
    }
    let service = await globalThis.client.getService(
      this.props.order.service_id
    );
    this.service = service;
  }

  setLineHeight(l) {
    let lh = l.height;
    if (this.props.order.last) {
      lh = lh * 0.1;
    }
    lh += 12;
    this.setState({ lineHeight: lh });
  }

  getItemIcon(item) {
    if (item.cleaning && item.ironing) {
      return Icons.cleanIron;
    } else if (item.ironing) {
      return Icons.iron;
    } else return Icons.clean;
  }
  toggleExpand() {
    if (this.state.items.length == 0) return;
    let v = this.state.expand;
    this.setState({ expand: !v });
  }
  async rate(rate) {
    if (await globalThis.client.rateOrder(rate, this.props.order.id)) {
      this.setState({ rate: rate });
    }
  }
  async cancel() {
    Alert.alert(
      "Cancel Pickup?",
      "Are you sure you want to cancel the pickup?",
      [
        {
          text: "Yes",
          onPress: () => {
            globalThis.client.cancelPickup(this.props.order.id).then((v) => {
              if (v) this.props.cancelPickup(this.props.order.id);
            });
          },
        },
        {
          text: "No",
        },
      ]
    );
  }
  call() {
    if (this.service != null) {
      Linking.openURL(`tel:${this.service.phone}`);
    }
  }
  goToMap() {
    this.props.goToMap(this.service.latitude, this.service.longitude);
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.dateBar ? (
          <View
            style={styles.dateContainer}
            onLayout={(e) => this.setLineHeight(e.nativeEvent.layout)}
          >
            <View style={[styles.line, { height: this.state.lineHeight }]}>
              <View
                style={[
                  styles.dateMarker,
                  {
                    backgroundColor:
                      this.props.order.status == "archived"
                        ? Colors.default.dateLine
                        : Colors.default.orders,
                  },
                ]}
              />
              <Text style={styles.date}>{this.state.date}</Text>
            </View>
          </View>
        ) : null}

        <View style={[styles.order]}>
          {this.props.dateBar ? null : (
            <Text style={styles.dateSingle}>{this.state.date}</Text>
          )}
          <TouchableOpacity
            style={
              this.props.dateBar
                ? styles.card
                : [styles.card, { marginTop: 0.059375 * screenHeight }]
            }
            activeOpacity={0.9}
            onPress={() => this.toggleExpand()}
          >
            <View style={styles.OrderHeader}>
              <Text style={styles.orderTitle}>{this.state.title}</Text>
              {this.props.order.price != null ? (
                <Text style={styles.price}>L.E {this.props.order.price}</Text>
              ) : null}
            </View>
            {this.state.expand
              ? this.state.items.map((item) => {
                  return (
                    <View style={styles.item}>
                      <View style={styles.itemIconName}>
                        <Image
                          source={this.getItemIcon(item)}
                          resizeMode={"contain"}
                          style={styles.itemIcon}
                        />
                        <Text style={styles.itemName}>{item.name}</Text>
                      </View>
                      <Text style={styles.itemPrice}>L.E {item.price}</Text>
                    </View>
                  );
                })
              : null}
            <ProgressBar
              stage={this.state.progress}
              style={
                this.state.expand
                  ? [styles.ProgressBar, { marginTop: 0.015 * screenHeight }]
                  : styles.ProgressBar
              }
            />
            <Text style={styles.address}>{this.state.address}</Text>
            {this.state.items.length > 0 ? (
              <Image
                source={this.state.expand ? Icons.collapse : Icons.expand}
                resizeMode="contain"
                style={styles.expand}
              />
            ) : null}
          </TouchableOpacity>
          <View
            style={[
              styles.buttons,
              // {
              //   justifyContent: this.state.cancelBtn
              //     ? "space-between"
              //     : "flex-end",
              // },
            ]}
          >
            {this.state.rate ? (
              <Rate
                onChangeRate={(rate) => this.rate(rate)}
                value={this.state.rate}
                style={styles.rate}
              />
            ) : (
              // <View style={styles.rightButtons}>
              <>
                {this.state.cancelBtn ? (
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    activeOpacity={0.8}
                    onPress={() => this.cancel()}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.callBtn}
                      activeOpacity={0.8}
                      onPress={() => this.call()}
                    >
                      <Image
                        source={Icons.call}
                        resizeMode={"contain"}
                        style={styles.callIcon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.locationBtn}
                      activeOpacity={0.8}
                      onPress={() => this.goToMap()}
                    >
                      <Image
                        source={Icons.location.home}
                        resizeMode={"contain"}
                        style={styles.locationIcon}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </>
              // </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    width: "87.22%",
    marginBottom: 11,
    // borderWidth: 1,
  },
  dateSingle: {
    position: "absolute",
    top: 0,
    left: 0.0277 * screenWidth,
    fontFamily: "poppins-regular",
    fontSize: 0.025 * screenHeight,
    color: Colors.default.back,
  },
  expand: {
    width: 0.025 * screenWidth,
    height: 0.6489 * 0.025 * screenWidth,
    marginBottom: 0.015 * screenHeight,
  },
  ProgressBar: {
    width: "88.67%",
    height: 0.035 * screenHeight,
    marginBottom: 0.025 * screenHeight,
  },
  dateContainer: {
    flex: 0.46,
    height: "100%",
  },
  order: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    height: 0.046875 * screenHeight,
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 5,
    // borderWidth: 1,
  },
  card: {
    width: "100%",
    // height: 200,
    elevation: 4,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: 0,
    borderWidth: 2,
    borderColor: Colors.default.dateLine,
    position: "absolute",
    left: 0.2027 * screenWidth,
    top: -5,
  },
  dateMarker: {
    backgroundColor: Colors.default.orders,
    height: 15,
    width: 15,
    position: "absolute",
    borderRadius: 1000,
    left: -7.5,
    top: 29,
  },
  date: {
    fontFamily: "poppins-regular",
    fontSize: 0.025 * screenHeight,
    position: "absolute",
    top: 18,
    right: 20,
    color: Colors.default.back,
  },
  cancelBtn: {
    height: 0.027 * screenHeight,
    width: 0.2 * screenWidth,
    borderRadius: 0.0135 * screenHeight,
    backgroundColor: Colors.default.orders,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0.055 * screenWidth,
  },
  cancelText: {
    fontSize: 0.014 * screenHeight,
    fontFamily: "poppins-regular",
    color: "#fff",
  },
  locationBtn: {
    aspectRatio: 1,
    width: 0.08 * screenWidth,
    borderRadius: 0.04 * screenWidth,
    backgroundColor: Colors.default.orders,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    marginRight: 0.055 * screenWidth,
  },
  locationIcon: {
    width: "40%",
  },
  rightButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0.055 * screenWidth,
    borderWidth: 1,
  },
  callBtn: {
    aspectRatio: 1,
    width: 0.08 * screenWidth,
    borderRadius: 0.04 * screenWidth,
    backgroundColor: Colors.default.orders,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    marginRight: 0.025 * screenWidth,
  },
  callIcon: {
    width: "35%",
  },
  rate: {
    width: 0.3 * screenWidth,
    marginRight: 0.03 * screenWidth,
    marginTop: 0.03 * screenHeight,
  },
  OrderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0.025 * screenHeight,
    width: "100%",
  },
  orderTitle: {
    fontFamily: "poppins-regular",
    fontSize: 0.025 * screenHeight,
    color: Colors.default.back,
    marginTop: 0.01875 * screenHeight,
    marginLeft: 0.044 * screenWidth,
  },
  price: {
    fontFamily: "poppins-light",
    fontSize: 0.01875 * screenHeight,
    color: Colors.default.back,
    marginTop: 0.025 * screenHeight,
    marginRight: 0.044 * screenWidth,
  },
  address: {
    fontFamily: "poppins-light",
    fontSize: 0.013 * screenHeight,
    color: Colors.default.back,
    marginLeft: 0.044 * screenWidth,
    marginBottom: 0.021875 * screenHeight,
    marginRight: 0.05 * screenWidth,
  },
  item: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0.005 * screenHeight,
  },
  itemName: {
    fontFamily: "poppins-extra-light",
    fontSize: 0.015625 * screenHeight,
    color: Colors.default.back,
  },
  itemPrice: {
    fontFamily: "poppins-extra-light",
    fontSize: 0.015625 * screenHeight,
    color: Colors.default.back,
    width: 0.1 * screenWidth,
  },
  itemIcon: {
    width: 0.04 * screenWidth,
    height: 0.04 * screenWidth,
    marginRight: 0.027 * screenWidth,
  },
  itemIconName: {
    flexDirection: "row",
  },
});
