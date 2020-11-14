import * as React from "react";
import {
  View,
  Text,
  Image,
  RefreshControl,
  Dimensions,
  I18nManager,
} from "react-native";
import Icons from "../../constants/Icons";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./style";
import Colors from "../../constants/Colors";
import Header from "../../components/header/Header";
import trans from "../../constants/Translations";
import { loadPrices, setItemsCached } from "../../redux/clientSlice";
import { useSelector, useDispatch } from "react-redux";
const screenWidth = Math.round(Dimensions.get("window").width);

export default function PricingScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const rootNav = route.params.rootNav;
  const backText = trans.t("homePage");
  const headerText = trans.t("pricingList");
  const items = useSelector((state) => state.client.items);
  const cached = useSelector((state) => state.client.itemsCached);
  const rtl = I18nManager.isRTL;
  const lang = useSelector((state) => state.client.language);
  const [headerShadow, setHeaderShadow] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  const load = async () => {
    dispatch(loadPrices());
  };

  const renderRow = (data, index) => {
    const name = lang == "ar" ? data.name_ar : data.name;
    return (
      <View style={styles.row} key={index}>
        <Text style={styles.item}>{name}</Text>
        <View style={styles.Hrow2}>
          <Text style={[styles.priceIron]}>
            {trans.t("LE")} {data.ironing_price}
          </Text>
          <View style={styles.cText}>
            <Text style={styles.priceClean}>
              {trans.t("LE")} {data.cleaning_price}
            </Text>
          </View>
        </View>
      </View>
    );
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
  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  React.useEffect(() => {
    if (!cached) {
      load();
      dispatch(setItemsCached(true));
    }
  }, []);

  return (
    <View style={styles.container}>
      <Header
        nav={rootNav}
        backText={backText}
        shadow={headerShadow}
        icon={Icons.profile.home}
        style={{ backgroundColor: Colors.pricing }}
        textStyle={styles.headerText}
        text={headerText}
        iconStyle={[
          styles.headerIcon,
          // rtl ? { left: 0.05 * screenWidth } : { right: 0.05 * screenWidth },
        ]}
      />
      <ScrollView
        style={{ width: "100%", flex: 1 }}
        contentContainerStyle={{ alignItems: "center" }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => onScroll(e.nativeEvent.contentOffset)}
        scrollEventThrottle={16}
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
        <View style={styles.card}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableTilte}>{trans.t("items")}</Text>
            <View style={styles.Hrow}>
              <Image
                source={Icons.iron}
                style={styles.iron}
                resizeMode={"contain"}
              />
              <Image
                source={Icons.clean}
                style={styles.clean}
                resizeMode={"contain"}
              />
            </View>
          </View>
          <View style={styles.separator} />
          {items.map((item, index) => {
            return renderRow(item, index);
          })}
        </View>
      </ScrollView>
    </View>
  );
}
