import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  StatusBar,
  RefreshControl,
} from "react-native";
import StickyHeader from "../../components/header/StickyHeader";
import Icons from "../../constants/Icons";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./style";
import Colors from "../../constants/Colors";
import Header from "../../components/header/Header";

export default function PricingScreen({ navigation, route }) {
  const rootNav = route.params.rootNav;
  const backText = "Home Page";
  const headerText = "Pricing List";
  const [items, setItems] = React.useState([]);
  const [headerElevation, setHeaderElevation] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const load = async () => {
    let itms = await globalThis.client.getPriceList();
    setItems(itms);
  };

  const renderRow = (data, index) => {
    return (
      <View style={styles.row} key={index}>
        <Text style={styles.item}>{data.name}</Text>
        <Text style={styles.priceIron}>L.E {data.ironing_price}</Text>
        <Text style={styles.priceClean}>L.E {data.cleaning_price}</Text>
      </View>
    );
  };

  const adjustHeaderElevation = (offset) => {
    if (offset.y == 0 && headerElevation != 0) {
      setHeaderElevation(0);
    } else if (offset.y != 0 && headerElevation == 0) {
      setHeaderElevation(5);
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        nav={rootNav}
        backText={backText}
        elevation={headerElevation}
        icon={Icons.profile.home}
        style={{ backgroundColor: Colors.pricing }}
        textStyle={styles.headerText}
        text={headerText}
        iconStyle={styles.headerIcon}
      />
      <ScrollView
        style={{ width: "100%", flex: 1 }}
        contentContainerStyle={{ alignItems: "center" }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => adjustHeaderElevation(e.nativeEvent.contentOffset)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      >
        <View style={styles.card}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableTilte}>Items</Text>
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
          <View style={styles.separator} />
          {items.map((item, index) => {
            return renderRow(item, index);
          })}
        </View>
      </ScrollView>
    </View>
  );
}
