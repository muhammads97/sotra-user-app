import * as React from "react";
import {
  View,
  Text,
  RefreshControl,
  Platform,
  Dimensions,
  I18nManager,
} from "react-native";
import Header from "../../components/header/Header";
import Icons from "../../constants/Icons";
import Colors from "../../constants/Colors";
import trans from "../../constants/Translations";
import Order from "./Order";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./style";
import RoundEdgeButton from "../../components/button/RoundEdge";
import { useDispatch, useSelector } from "react-redux";
import {
  resetRequestStatusOrders,
  loadPicking,
  loadWaiting,
  loadServing,
  loadDelivering,
  loadArchived,
  emptyArchived,
  setCached,
} from "../../redux/ordersSlice";
const screenWidth = Math.round(Dimensions.get("window").width);

export default function OrdersScreen(props) {
  const dispatch = useDispatch();
  const picking = useSelector((state) => state.orders.picking);
  const pickingCached = useSelector((state) => state.orders.pickingCached);
  const waiting = useSelector((state) => state.orders.waiting);
  const waitingCached = useSelector((state) => state.orders.waitingCached);
  const serving = useSelector((state) => state.orders.serving);
  const servingCached = useSelector((state) => state.orders.servingCached);
  const delivering = useSelector((state) => state.orders.delivering);
  const rtl = I18nManager.isRTL;
  const deliveringCached = useSelector(
    (state) => state.orders.deliveringCached
  );
  const archived = useSelector((state) => state.orders.archived);
  const archivedCached = useSelector((state) => state.orders.archivedCached);

  const currentPage = useSelector((state) => state.orders.archivedPage);
  const status = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  const rootNav = props.route.params.rootNav;
  const backText = trans.t("homePage");
  const headerText = trans.t("orders");
  const [headerShadow, setHeaderShadow] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const getState = () => {
    let len =
      picking.length +
      waiting.length +
      serving.length +
      delivering.length +
      archived.length;
    if (len == 0) return 0;
    if (len == 1) return 1;
    if (len > 1) return 2;
  };

  const loadOlderOrders = (reset) => {
    let p = page;
    if (reset) {
      p = 1;
      setPage(2);
    } else {
      setPage(page + 1);
    }
    if (p == 1 && archivedCached) return;
    dispatch(loadArchived({ page: p, perPage: 5 }));
  };

  const load = (reload) => {
    dispatch(resetRequestStatusOrders());
    dispatch(emptyArchived());
    if (!pickingCached || reload) {
      dispatch(loadPicking());
    }
    if (!waitingCached || reload) {
      dispatch(loadWaiting());
    }
    if (!servingCached || reload) {
      dispatch(loadServing());
    }
    if (!deliveringCached || reload) {
      dispatch(loadDelivering());
    }
    loadOlderOrders(true);
  };

  const onRefresh = async () => {
    // console.log("refresh");
    setRefreshing(true);
    load(true);
    setRefreshing(false);
  };

  React.useEffect(() => {
    load(false);
  }, []);

  const orderNow = () => {
    rootNav.navigate("OrderConfirmation");
  };

  const onScroll = (offset) => {
    if (offset.y == 0) {
      setHeaderShadow({});
    } else if (Object.keys(headerShadow).length === 0) {
      setHeaderShadow({
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.16,
        shadowRadius: 6,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Header
        nav={rootNav}
        backText={backText}
        backTo={"Home"}
        shadow={headerShadow}
        text={headerText}
        icon={Icons.orders.home}
        style={{ backgroundColor: Colors.orders }}
        iconStyle={[
          styles.headerIcon,
          // rtl ? { left: 0.05 * screenWidth } : { right: 0.05 * screenWidth },
        ]}
        textStyle={styles.headerText}
      />
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
        scrollEventThrottle={16}
      >
        {Platform.OS == "ios" ? (
          <View
            style={{
              height: 25,
              width: "100%",
            }}
          />
        ) : null}
        {getState() == 0 ? (
          <Text style={styles.epmtyText}>{trans.t("noOrders")}</Text>
        ) : (
          <>
            {picking.map((p, index) => {
              return (
                <Order
                  index={index}
                  status={"picking"}
                  key={p.id}
                  dateBar={getState() == 2}
                />
              );
            })}
            {waiting.map((p, index) => {
              return (
                <Order
                  index={index}
                  status={"waiting"}
                  key={p.id}
                  dateBar={getState() == 2}
                />
              );
            })}
            {serving.map((o, index) => {
              return (
                <Order
                  index={index}
                  status={"serving"}
                  key={o.id}
                  dateBar={getState() == 2}
                />
              );
            })}
            {delivering.map((o, index) => {
              return (
                <Order
                  index={index}
                  status={"delivering"}
                  key={o.id}
                  dateBar={getState() == 2}
                />
              );
            })}
            {archived.map((o, index) => {
              return (
                <Order
                  index={index}
                  status={"archived"}
                  key={o.id}
                  dateBar={getState() == 2}
                />
              );
            })}
          </>
        )}
        <View style={styles.buttonSection}>
          <RoundEdgeButton
            style={{ backgroundColor: Colors.orders }}
            text={
              getState() == 0 ? trans.t("orderNow") : trans.t("loadOlderOrders")
            }
            onPress={() => {
              if (getState() == 0) orderNow();
              else loadOlderOrders();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

let order = {
  address: {
    additional_directions: "Bjak",
    address: null,
    apt: "5",
    building_number: "6",
    deleted: false,
    floor: "2",
    id: 142,
    latitude: 31.2152282711414,
    longitude: 29.9452437646687,
    name: "Home",
    street: "Smouha",
    time_slots: [
      {
        created_at: "2020-11-04T14:28:16.284Z",
        from: 7,
        id: 1,
        time_type: "night",
        to: 8,
        updated_at: "2020-11-04T14:29:11.710Z",
      },
      {
        created_at: "2020-11-04T14:30:41.498Z",
        from: 10,
        id: 2,
        time_type: "morning",
        to: 11,
        updated_at: "2020-11-04T14:30:41.498Z",
      },
    ],
  },
  address_id: 142,
  after_promo_price: null,
  client: {
    call_before_delivery: false,
    id: 102,
    name: "Muhammad-test",
    phone: "+201205147358",
    referral_code: "SE2102jFuXb",
  },
  client_id: 102,
  created_at: "2020-11-08T21:02:54.436Z",
  delivered_time: null,
  dry_clean_id: 1,
  has_wedding_dress: true,
  id: 124,
  pay_with_wallet: true,
  promo_applied: false,
  promo_discount: null,
  rating: null,
  served_time: null,
  service_id: 7,
  status: "waiting",
  time_slot: {
    created_at: "2020-11-04T14:30:41.498Z",
    from: 10,
    id: 2,
    time_type: "morning",
    to: 11,
    updated_at: "2020-11-04T14:30:41.498Z",
  },
  total_items: 0,
  total_price: 0,
};
