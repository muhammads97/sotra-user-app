import * as React from "react";
import { View, Text, Image, RefreshControl } from "react-native";
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
  const [headerShadow, setHeaderShadow] = React.useState({});
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
    load();
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
        iconStyle={styles.headerIcon}
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
