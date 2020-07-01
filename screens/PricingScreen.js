import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  StatusBar,
} from "react-native";
import StickyHeader from "../components/StickyHeader";
import * as Icons from "../constants/Icons";
import * as Colors from "../constants/Colors";
import { Client } from "../hooks/Client";
import { ScrollView } from "react-native-gesture-handler";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;
const headerHeight = 0.239 * screenHeight;
export default class PricingScreen extends React.Component {
  constructor({ navigation, route }) {
    super();
    this.rootNav = route.params.rootNav;
    this.backName = "Home Page";
    this.headerText = "Pricing List";
    this.state = {
      items: [],
      headerEleveation: 0,
    };
  }

  async componentDidMount() {
    let items = await globalThis.client.getPriceList();
    this.setState({ items: items });
  }

  renderHeader = () => {
    var Sticky_header_View = (
      <View style={styles.header}>
        <Text style={styles.headerText}>{this.headerText}</Text>
        <Image
          source={Icons.default.pricing.home}
          resizeMode={"contain"}
          style={styles.headerIcon}
        />
      </View>
    );
    return Sticky_header_View;
  };

  renderRow = (data) => {
    return (
      <View style={styles.row}>
        <Text style={styles.item}>{data.name}</Text>
        <Text style={styles.priceIron}>L.E {data.ironing_price}</Text>
        <Text style={styles.priceClean}>L.E {data.cleaning_price}</Text>
      </View>
    );
  };

  adjustHeaderElevation(offset) {
    if (offset.y == 0 && this.state.headerEleveation != 0) {
      this.setState({ headerEleveation: 0 });
    } else if (offset.y != 0 && this.state.headerEleveation == 0) {
      this.setState({ headerEleveation: 5 });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StickyHeader
          navigator={this.rootNav}
          backName={this.backName}
          elevation={this.state.headerEleveation}
          headerComponent={this.renderHeader()}
        />
        <ScrollView
          style={{ width: "100%", flex: 1 }}
          contentContainerStyle={{ alignItems: "center" }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={(e) =>
            this.adjustHeaderElevation(e.nativeEvent.contentOffset)
          }
        >
          <View style={styles.card}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableTilte}>Items</Text>
              <Image
                source={Icons.default.iron}
                style={styles.iron}
                resizeMode={"contain"}
              />
              <Image
                source={Icons.default.clean}
                style={styles.clean}
                resizeMode={"contain"}
              />
            </View>
            <View style={styles.separator} />
            {this.state.items.map((item) => {
              return this.renderRow(item);
            })}
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
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.default.pricing,
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
    width: 0.0835 * screenWidth,
    height: 0.087193 * screenWidth,
    position: "absolute",
    right: 0.032 * screenWidth,
  },
  card: {
    backgroundColor: "#fff",
    elevation: 4,
    width: "85%",
    borderRadius: 0.01875 * screenHeight,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0.04 * screenHeight,
    margin: 0.02 * screenWidth,
    marginBottom: 0.012 * screenWidth,
  },
  tableTilte: {
    color: Colors.default.back,
    fontFamily: "poppins-regular",
    fontSize: 0.025 * screenHeight,
    flex: 1,
    marginLeft: 0.041 * screenWidth,
  },
  iron: {
    width: 0.0652 * screenWidth,
    height: 0.667378 * 0.0652 * screenWidth,
    flex: 0.32,
    // marginRight
  },
  clean: {
    width: 0.0652 * screenWidth,
    height: 0.667378 * 0.0652 * screenWidth,
    flex: 0.32,
    marginRight: 6,
  },
  separator: {
    width: 0.7277 * screenWidth,
    height: 0,
    borderBottomWidth: 0.5,
    opacity: 0.6,
    borderColor: Colors.default.input,
    marginBottom: 0.04 * screenWidth,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
    margin: 0.02 * screenWidth,
    // marginBottom: 0.012 * screenWidth,
  },
  item: {
    color: Colors.default.back,
    fontFamily: "poppins-extra-light",
    fontSize: 0.02 * screenHeight,
    flex: 1,
    marginLeft: 0.041 * screenWidth,
  },
  priceIron: {
    color: Colors.default.back,
    fontFamily: "poppins-extra-light",
    fontSize: 0.02 * screenHeight,
    flex: 0.32,
    // textAlign: "center",
    marginLeft: 43,
  },
  priceClean: {
    color: Colors.default.back,
    fontFamily: "poppins-extra-light",
    fontSize: 0.02 * screenHeight,
    flex: 0.32,
    // textAlign: "center",
    // marginRight: 6,
    marginLeft: 12,
  },
});
