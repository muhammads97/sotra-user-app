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
import { makeAddress, formatAddress } from "../../helpers/address";
import * as Months from "../../constants/Months";
import trans from "../../constants/Translations";
import Rate from "../../components/Rate";
import ProgressBar from "../../components/Progress";
import Icons from "../../constants/Icons";
import { useSelector, useDispatch } from "react-redux";
import {
  resetRequestStatusOrders,
  loadOrderItems,
  rateOrder,
  cancelOrder,
} from "../../redux/ordersSlice";
const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;

export default function Order(props) {
  const dispatch = useDispatch();
  const index = props.index;
  const orderStatus = props.status;
  const order = useSelector((state) => state.orders[orderStatus][index]);
  const balance = useSelector((state) => state.client.balance);
  const rtl = useSelector((state) => state.client.rtl);
  const lang = useSelector((state) => state.client.language);
  const [lineHeight, setLineHeight] = React.useState(200);
  const title =
    orderStatus == "waiting"
      ? trans.t("orderPlaced")
      : orderStatus == "picking"
      ? trans.t("picking")
      : order.total_items == 0 && order.status == "serving"
      ? trans.t("inService")
      : `${order.total_items} ${trans.t("orderItems")}`;
  const progress =
    orderStatus == "waiting"
      ? 0
      : orderStatus == "picking"
      ? 1
      : orderStatus == "serving"
      ? 2
      : 3;
  const cancelBtn = orderStatus == "waiting";
  const rate = orderStatus == "archived";
  const [expand, setExpand] = React.useState(false);

  const getDate = (dateStr) => {
    let date = new Date(dateStr);
    return date.getDate() + " " + Months.default[date.getMonth()];
  };

  React.useEffect(() => {
    dispatch(resetRequestStatusOrders());
  }, []);

  const loadItems = () => {
    if (order.items.length != order.total_items) {
      dispatch(loadOrderItems({ index, status: orderStatus }));
    }
  };

  const changeLineHeight = (l) => {
    let lh = l.height;
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
  const getItemPrice = (item) => {
    return (
      0 +
      (item.cleaning ? item.sotra_cleaning_price : 0) +
      (item.ironing ? item.sotra_ironing_price : 0)
    );
  };
  const toggleExpand = () => {
    if (order.total_items == 0) return;
    let v = expand;
    setExpand(!v);
  };

  const onRate = async (rate) => {
    dispatch(rateOrder({ index, rating: rate }));
  };

  const cancel = async () => {
    Alert.alert(trans.t("cancelPickup"), trans.t("cancelPickupMsg"), [
      {
        text: trans.t("yes"),
        onPress: () => dispatch(cancelOrder({ index })),
      },
      {
        text: trans.t("no"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {props.dateBar ? (
        <View
          style={styles.dateContainer}
          onLayout={(e) => changeLineHeight(e.nativeEvent.layout)}
        >
          <View
            style={[
              styles.line,
              { height: lineHeight },
              rtl
                ? { right: 0.2027 * screenWidth }
                : { left: 0.2027 * screenWidth },
            ]}
          >
            <View
              style={[
                styles.dateMarker,
                {
                  backgroundColor:
                    orderStatus == "archived"
                      ? Colors.default.dateLine
                      : Colors.default.orders,
                },
                rtl ? { right: -7.5 } : { left: -7.5 },
              ]}
            />
            <Text style={[styles.date, rtl ? { left: 20 } : { right: 20 }]}>
              {getDate(order.created_at)}
            </Text>
          </View>
        </View>
      ) : null}

      <View style={[styles.order]}>
        {props.dateBar ? null : (
          <Text
            style={[
              styles.dateSingle,
              rtl
                ? { right: 0.0277 * screenWidth }
                : { left: 0.0277 * screenWidth },
            ]}
          >
            {getDate(order.created_at)}
          </Text>
        )}
        <TouchableOpacity
          style={
            props.dateBar
              ? styles.card
              : [styles.card, { marginTop: 0.059375 * screenHeight }]
          }
          activeOpacity={0.9}
          onPress={() => {
            loadItems();
            toggleExpand();
          }}
          disabled={!order.total_items}
        >
          <View style={styles.OrderHeader}>
            <Text
              style={[
                styles.orderTitle,
                rtl
                  ? { marginRight: 0.044 * screenWidth }
                  : { marginLeft: 0.044 * screenWidth },
              ]}
            >
              {title}
            </Text>
            {order.status != "waiting" &&
            order.status != "picking" &&
            order.total_items != 0 ? (
              <>
                {order.promo_applied ? (
                  <View
                    style={[
                      styles.discountedPrice,
                      rtl
                        ? { marginLeft: 0.044 * screenWidth }
                        : { marginRight: 0.044 * screenWidth },
                    ]}
                  >
                    <Text style={styles.oldPrice}>
                      {order.total_price} {trans.t("LE")}
                    </Text>
                    <Text style={styles.newPrice}>
                      {order.after_promo_price} {trans.t("LE")}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={[
                      styles.price,
                      rtl
                        ? { marginLeft: 0.044 * screenWidth }
                        : { marginRight: 0.044 * screenWidth },
                    ]}
                  >
                    {order.total_price} {trans.t("LE")}
                  </Text>
                )}
              </>
            ) : null}
          </View>
          {order.status == "waiting" ? (
            <Text
              style={[
                styles.timeSlot,
                rtl
                  ? { marginRight: 0.088 * screenWidth }
                  : { marginLeft: 0.088 * screenWidth },
              ]}
            >
              {trans.t("pickingAt")}{" "}
              {`${order.time_slot.from} ~ ${order.time_slot.to} ${order.time_slot.time_type}`}
            </Text>
          ) : order.status == "picking" ? (
            <Text
              style={[
                styles.timeSlot,
                rtl
                  ? { marginRight: 0.088 * screenWidth }
                  : { marginLeft: 0.088 * screenWidth },
              ]}
            >
              {trans.t("pickingNow")}
            </Text>
          ) : null}
          {expand && order.items.length > 0 ? (
            <View style={styles.separator} />
          ) : null}
          {expand ? (
            <>
              {order.items.map((item, index) => {
                return (
                  <View style={styles.item} key={index}>
                    <View style={styles.itemIconName}>
                      <Image
                        source={getItemIcon(item)}
                        resizeMode={"contain"}
                        style={[
                          styles.itemIcon,
                          rtl
                            ? { marginLeft: 0.027 * screenWidth }
                            : { marginRight: 0.027 * screenWidth },
                        ]}
                      />
                      <Text style={styles.itemName}>
                        {lang == "ar" ? item.item.name_ar : item.item.name}
                      </Text>
                    </View>
                    <Text style={styles.itemPrice}>
                      {getItemPrice(item)} {trans.t("LE")}
                    </Text>
                  </View>
                );
              })}
              {order.status == "delivering" || order.status == "archived" ? (
                <>
                  {/* <View style={styles.lineSep} /> */}
                  <View style={[styles.item, { marginTop: 2 }]}>
                    <Text style={styles.itemName}>{trans.t("totalPrice")}</Text>
                    <Text style={styles.itemPrice}>
                      {order.total_price} {trans.t("LE")}
                    </Text>
                  </View>
                  {order.promo_applied ? (
                    <View style={styles.item}>
                      <Text style={styles.itemName}>
                        %{order.promo_discount.split("%")[0].split(".")[0]}{" "}
                        {trans.t("discounted")}
                      </Text>
                      <Text style={styles.itemPrice}>
                        {order.after_promo_price} {trans.t("LE")}
                      </Text>
                    </View>
                  ) : null}
                  <View style={styles.item}>
                    <Text style={styles.itemName}>
                      {trans.t("paidFromWallet")}
                    </Text>
                    <Text style={styles.itemPrice}>
                      -{order.wallet_paid} {trans.t("LE")}
                    </Text>
                  </View>
                  {order.status == "delivering" ? (
                    <View style={styles.item}>
                      <Text style={styles.itemName}>
                        {trans.t("cashRequired")}
                      </Text>
                      <Text style={styles.itemPrice}>
                        {order.final_cash_required} {trans.t("LE")}
                      </Text>
                    </View>
                  ) : null}
                </>
              ) : null}
            </>
          ) : null}
          <ProgressBar
            stage={progress}
            style={
              expand
                ? [styles.ProgressBar, { marginTop: 0.015 * screenHeight }]
                : styles.ProgressBar
            }
          />
          <Text style={styles.address}>{formatAddress(order.address)}</Text>
          {order.total_items > 0 ? (
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
              value={order.rating == null ? 0 : order.rating}
              style={[
                styles.rate,
                rtl
                  ? { marginLeft: 0.03 * screenWidth }
                  : { marginRight: 0.03 * screenWidth },
              ]}
            />
          ) : (
            // <View style={styles.rightButtons}>

            <>
              {order.promo_applied &&
              (order.status == "waiting" || order.status == "picking") ? (
                <View
                  style={[
                    styles.discountHolder,
                    rtl
                      ? { paddingRight: 0.02 * screenWidth }
                      : { paddingLeft: 0.02 * screenWidth },
                  ]}
                >
                  <Text style={styles.discountText}>
                    %{order.promo_discount.split("%")[0].split(".")[0]}{" "}
                    {trans.t("discount")}
                  </Text>
                </View>
              ) : null}
              {order.status == "delivering" ? (
                <Text
                  style={[
                    styles.balance,
                    rtl ? { marginLeft: 10 } : { marginRight: 10 },
                  ]}
                >
                  {trans.t("cashRequired")}: {order.final_cash_required}{" "}
                  {trans.t("LE")}
                </Text>
              ) : null}
              {cancelBtn ? (
                <TouchableOpacity
                  style={[
                    styles.cancelBtn,
                    rtl
                      ? { marginLeft: 0.055 * screenWidth }
                      : { marginRight: 0.055 * screenWidth },
                  ]}
                  activeOpacity={0.8}
                  onPress={() => cancel()}
                >
                  <Text style={styles.cancelText}>{trans.t("cancel")}</Text>
                </TouchableOpacity>
              ) : null}
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
    marginTop: 0.015 * screenHeight,
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
    top: -5,
  },
  dateMarker: {
    backgroundColor: Colors.default.orders,
    height: 15,
    width: 15,
    position: "absolute",
    borderRadius: 1000,
    top: 29,
  },
  date: {
    fontFamily: "poppins-regular",
    fontSize: 0.025 * screenHeight,
    position: "absolute",
    top: 18,
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
  },
  cancelText: {
    fontSize: 0.014 * screenHeight,
    fontFamily: "poppins-regular",
    color: "#fff",
  },
  rate: {
    width: 0.3 * screenWidth,
    marginTop: 0.03 * screenHeight,
  },
  OrderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  orderTitle: {
    fontFamily: "poppins-regular",
    fontSize: 0.023 * screenHeight,
    color: Colors.default.back,
    marginTop: 0.01875 * screenHeight,
  },
  timeSlot: {
    fontFamily: "poppins-light",
    textAlign: "left",
    width: "100%",
    fontSize: 0.015 * screenHeight,
    color: Colors.default.back,
  },
  price: {
    fontFamily: "poppins-light",
    fontSize: 0.01875 * screenHeight,
    color: Colors.default.back,
    marginTop: 0.025 * screenHeight,
  },
  balance: {
    fontFamily: "poppins-light",
    fontSize: 0.01875 * screenHeight,
    color: Colors.default.back,
  },
  cash: {
    fontFamily: "poppins-regular",
    fontSize: 0.01875 * screenHeight,
    color: Colors.default.back,
    marginTop: 10,
  },
  lineSep: {
    height: 0,
    width: "78%",
    borderBottomWidth: 1,
    borderColor: Colors.default.dateLine,
    marginBottom: 5,
  },
  address: {
    fontFamily: "poppins-light",
    fontSize: 0.013 * screenHeight,
    color: Colors.default.back,
    marginLeft: 0.05 * screenWidth,
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
    width: 0.12 * screenWidth,
  },
  itemIcon: {
    width: 0.04 * screenWidth,
    height: 0.04 * screenWidth,
  },
  itemIconName: {
    flexDirection: "row",
  },
  discountHolder: {
    flexDirection: "row",
    flexGrow: 1,
  },
  discountText: {
    fontFamily: "poppins-light",
    fontSize: 0.016 * screenHeight,
    color: "red",
  },
  separator: {
    height: 10,
  },
  newPrice: {
    fontFamily: "poppins-light",
    fontSize: 0.02 * screenHeight,
    color: Colors.default.back,
    flexGrow: 1,
  },
  oldPrice: {
    fontFamily: "poppins-light",
    fontSize: 0.012 * screenHeight,
    color: "red",
    flexGrow: 1,
    // marginTop: -8,
    marginRight: 3,
    marginLeft: 3,
    // borderWidth: 1,
    textAlignVertical: "bottom",
    textDecorationLine: "line-through",
  },
  discountedPrice: {
    marginTop: 0.025 * screenHeight,
    justifyContent: "center",
    alignItems: "center",
    height: 28,
    flexDirection: "row",
  },
});
