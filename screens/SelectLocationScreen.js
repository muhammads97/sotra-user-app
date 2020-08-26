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
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import StickyHeader from "../components/header/StickyHeader";
import * as Icons from "../constants/Icons";
import * as Colors from "../constants/Colors";
import { Client } from "../hooks/Client";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;
const headerHeight = 0.239 * screenHeight;
export default class SelectLocationScreen extends React.Component {
  constructor({ navigation, route }) {
    super();
    this.navigation = navigation;
    this.backName = route.params.backName;
    this.headerText = route.params.headerText;
    this.onBack = route.params.onBack;
    this.address = route.params.state;
    this.state = {
      region: {
        longitude: 30.20485,
        latitude: 27.79961,
        longitudeDelta: 11,
        latitudeDelta: 8,
      },
      mapStyle: {},
    };
    this.map = React.createRef();
  }

  async componentDidMount() {
    let locationPermission = await Permissions.getAsync(Permissions.LOCATION);
    if (locationPermission.status != "granted") {
      let locationPermission2 = await Permissions.askAsync(
        Permissions.LOCATION
      );
      if (locationPermission2.status == "granted") {
      } else {
        throw new Error("Location permission not granted");
      }
    }
  }
  async setLocationState() {
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      mapContainer: 5000,
      timeout: 5000,
    });
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      longitudeDelta: 0.002,
      latitudeDelta: 0.002,
    };
    this.map.current.animateToRegion(region, 1500);
  }
  renderHeader = () => {
    var Sticky_header_View = (
      <View style={styles.header}>
        <Text style={styles.headerText}>{this.headerText}</Text>
        <Image
          source={Icons.default.hanger}
          resizeMode={"contain"}
          style={styles.headerIcon}
        />
      </View>
    );
    return Sticky_header_View;
  };

  onRegionChange(region) {
    this.setState({ region: region });
  }
  async onPressSave() {
    this.address.latitude = this.state.region.latitude;
    this.address.longitude = this.state.region.longitude;
    if (await globalThis.client.addAddress(this.address)) {
      setTimeout(() => {
        this.navigation.goBack();
        this.navigation.goBack();
        this.onBack();
      }, 10);
    }
  }
  onMapReady() {
    this.setState({ mapStyle: styles.mapStyle }, () => {
      setTimeout(() => this.setLocationState(), 10);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StickyHeader
          navigator={this.navigation}
          backName={this.backName}
          elevation={0}
          headerComponent={this.renderHeader()}
        />
        <View style={styles.mapContainer}>
          <MapView
            ref={this.map}
            style={this.state.mapStyle}
            onMapReady={() => this.onMapReady()}
            zoomEnabled={true}
            showsCompass={true}
            showsUserLocation={true}
            onRegionChangeComplete={this.onRegionChange.bind(this)}
          ></MapView>
          <Image
            source={Icons.default.locationTag}
            resizeMode={"contain"}
            style={styles.picker}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => this.onPressSave()}
          >
            <Text style={styles.buttonText}>Save Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    position: "absolute",
    width: 0.03607 * screenWidth,
    height: 0.04685 * screenWidth,
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -0.018035 * screenWidth },
      { translateY: -0.04685 * screenWidth },
    ],
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  mapContainer: {
    height: 0.5953 * screenHeight,
    flexGrow: 1,
    width: 0.852 * screenWidth,
    borderRadius: 0.03333 * screenWidth,
    elevation: 6,
    overflow: "hidden",
    top: -0.08 * headerHeight,
  },
  mapStyle: {
    flex: 1,
    // height: 0.5953 * screenHeight,
    // marginTop: 100,
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
    // borderWidth: 3,
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
  },
  buttonText: {
    fontFamily: "poppins-regular",
    fontSize: 0.022 * screenHeight,
    color: "#fff",
    top: 1,
  },
  button: {
    width: "66.66%",
    height: 0.0578125 * screenHeight,
    backgroundColor: Colors.default.primary,
    borderRadius: 0.02890625 * screenHeight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0.046875 * screenHeight,
    // marginTop: 0.046875 * screenHeight,
    elevation: 2,
  },
  footer: {
    height: 0.14 * screenHeight,
    // flexGrow: 1,
    width: "100%",
    // borderWidth: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
