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
import * as Colors from "../../constants/Colors";
import { makeAddress } from "../../helpers/address";
import * as Months from "../../constants/Months";
import Rate from "../../components/Rate";
import ProgressBar from "../../components/Progress";
import Icons from "../../constants/Icons";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;

export default function Order(props) {
  const [lineHeight, setLineHeight] = React.useState(200);
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState(null);
  const [address, setAddress] = React.useState("");
  const [date, setDate] = React.useState("");
  const [progress, setProgress] = React.useState("");
  const [cancelBtn, setCancelBtn] = React.useState(false);
  const [rate, setRate] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [expand, setExpand] = React.useState(false);
  const [service, setService] = React.useState(null);

  const load = async () => {
    let itms;
    let dateStr = props.order.created_at;
    let date = new Date(dateStr);
    setDate(date.getDate() + " " + Months.default[date.getMonth()]);

    if (props.order.status == "waiting") {
      setTitle("Waiting");
      setProgress(0);
      setCancelBtn(true);
      let addr = await globalThis.client.getAddress(props.order.address_id);
      addr = makeAddress(addr);
      setAddress(addr);
    } else if (props.order.status == "picking") {
      setTitle("Picking");
      setProgress(1);
      let addr = await globalThis.client.getAddress(props.order.address_id);
      addr = makeAddress(addr);
      setAddress(addr);
    } else {
      setTitle(`${props.order.total_items} Items`);
      setPrice(`L.E ${props.order.total_price}`);
      if (props.order.status == "serving") {
        setProgress(2);
      } else {
        setProgress(3);
      }
      if (props.order.status == "archived") {
        setRate(true);
      }
      let addr = await globalThis.client.getAddress(props.order.address_id);
      addr = makeAddress(addr);
      setAddress(addr);

      itms = await globalThis.client.getOrderItems(props.order.id);
      for (let i = 0; i < itms.length; i++) {
        let p = 0;
        if (itms[i].cleaning) p += props.types[itms[i].item_id].cleaning_price;
        if (itms[i].ironing) p += props.types[itms[i].item_id].ironing_price;
        itms[i].price = p;
        itms[i].name = props.types[itms[i].item_id].name;
      }
      setItems(itms);
    }

    let s = await globalThis.client.getService(props.order.service_id);
    setService(s);
  };

  React.useEffect(() => {
    load();
  }, []);

  const changeLineHeight = (l) => {
    let lh = l.height;
    if (props.order.last) {
      lh = lh * 0.1;
    }
    lh += 12;
    setLineHeight(lh);
  };

  const getItemIcon = (item) => {
    if (item.cleaning && item.ironing) {
      return Icons.cleanIron;
    } else if (item.ironing) {
      return Icons.iron;
    } else return Icons.clean;
  };
  const toggleExpand = () => {
    if (props.order.total_items == 0) return;
    let v = expand;
    setExpand(!v);
  };
  const onRate = async (rate) => {
    if (await globalThis.client.rateOrder(rate, props.order.id)) {
      setRate(rate);
    }
  };
  const cancel = async () => {
    Alert.alert(
      "Cancel Pickup?",
      "Are you sure you want to cancel the pickup?",
      [
        {
          text: "Yes",
          onPress: () => {
            globalThis.client.cancelPickup(props.order.id).then((v) => {
              if (v) props.cancelPickup(props.order.id);
            });
          },
        },
        {
          text: "No",
        },
      ]
    );
  };
  const call = () => {
    if (service != null) {
      Linking.openURL(`tel:${service.phone}`);
    }
  };
  const goToMap = () => {
    props.goToMap(service.latitude, service.longitude);
  };
  return (
    <View style={styles.container}>
      {props.dateBar ? (
        <View
          style={styles.dateContainer}
          onLayout={(e) => changeLineHeight(e.nativeEvent.layout)}
        >
          <View style={[styles.line, { height: lineHeight }]}>
            <View
              style={[
                styles.dateMarker,
                {
                  backgroundColor:
                    props.order.status == "archived"
                      ? Colors.default.dateLine
                      : Colors.default.orders,
                },
              ]}
            />
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      ) : null}

      <View style={[styles.order]}>
        {props.dateBar ? null : <Text style={styles.dateSingle}>{date}</Text>}
        <TouchableOpacity
          style={
            props.dateBar
              ? styles.card
              : [styles.card, { marginTop: 0.059375 * screenHeight }]
          }
          activeOpacity={0.9}
          onPress={() => toggleExpand()}
          disabled={!props.order.total_items}
        >
          <View style={styles.OrderHeader}>
            <Text style={styles.orderTitle}>{title}</Text>
            {price != null ? <Text style={styles.price}>{price}</Text> : null}
          </View>
          {expand
            ? items.map((item, index) => {
                return (
                  <View style={styles.item} key={index}>
                    <View style={styles.itemIconName}>
                      <Image
                        source={getItemIcon(item)}
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
            stage={progress}
            style={
              expand
                ? [styles.ProgressBar, { marginTop: 0.015 * screenHeight }]
                : styles.ProgressBar
            }
          />
          <Text style={styles.address}>{address}</Text>
          {props.order.total_items > 0 ? (
            <Image
              source={expand ? Icons.collapse : Icons.expand}
              resizeMode="contain"
              style={styles.expand}
            />
          ) : null}
        </TouchableOpacity>
        <View style={[styles.buttons]}>
          {rate ? (
            <Rate
              onChangeRate={(rate) => onRate(rate)}
              value={props.order.rating == null ? 0 : props.order.rating}
              style={styles.rate}
            />
          ) : (
            // <View style={styles.rightButtons}>
            <>
              {cancelBtn ? (
                <TouchableOpacity
                  style={styles.cancelBtn}
                  activeOpacity={0.8}
                  onPress={() => cancel()}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.callBtn}
                    activeOpacity={0.8}
                    onPress={() => call()}
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
                    onPress={() => goToMap()}
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
          )}
        </View>
      </View>
    </View>
  );
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
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
