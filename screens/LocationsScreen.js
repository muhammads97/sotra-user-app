import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import StickyHeader from "../components/StickyHeader";
import * as Icons from "../constants/Icons";
import * as Colors from "../constants/Colors";
import { Client } from "../hooks/Client";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;
const headerHeight = 0.239 * screenHeight;
export default class LocationsScreen extends React.Component {
  constructor({ navigation, route }) {
    super();
    this.rootNav = route.params.rootNav;
    this.route = route;
    this.backName = "Home Page";
    this.headerText = "Our Locations";
    this.state = {
      region: {
        longitude: 30.20485,
        latitude: 27.79961,
        longitudeDelta: 11,
        latitudeDelta: 8,
      },
      mapStyle: {},
      locations: [],
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
    let location;
    if (this.route.params.position == null) {
      location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        mapContainer: 5000,
        timeout: 5000,
      });
    } else {
      location = {};
      location["coords"] = this.route.params.position;
    }

    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      longitudeDelta: 0.01,
      latitudeDelta: 0.01,
    };
    this.map.current.animateToRegion(region, 1500);
    let ourLocations = await globalThis.client.getLocations(region);
    if (ourLocations != null) {
      this.setState({ locations: ourLocations });
    }
  }
  renderHeader = () => {
    var Sticky_header_View = (
      <View style={styles.header}>
        <Text style={styles.headerText}>{this.headerText}</Text>
        <Image
          source={Icons.default.location.home}
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

  onMapReady() {
    this.setState({ mapStyle: styles.mapStyle }, () => {
      setTimeout(() => this.setLocationState(), 10);
    });
  }

  onPressContactUs() {
    Linking.openURL("tel:+201205147358");
  }

  render() {
    return (
      <View style={styles.container}>
        <StickyHeader
          navigator={this.rootNav}
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
          >
            {this.state.locations.map((marker) => (
              <MapView.Marker
                coordinate={{
                  longitude: marker.longitude,
                  latitude: marker.latitude,
                }}
                title={"Sotra"}
                description={"Sotra Service Point " + marker.id}
              >
                <Image
                  source={Icons.default.locationTag}
                  resizeMode={"contain"}
                  style={styles.picker}
                />
              </MapView.Marker>
            ))}
          </MapView>
        </View>
        <View style={styles.footer}>
          <Text style={styles.contactUsText}>Contact Our Support Line</Text>
          <TouchableOpacity
            style={styles.contactUsButton}
            activeOpacity={0.8}
            onPress={() => this.onPressContactUs()}
          >
            <Image
              source={Icons.default.call}
              resizeMode={"contain"}
              style={styles.contactUsIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    width: 0.06 * screenWidth,
    height: 0.063 * screenWidth,
    aspectRatio: 1.3,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  mapContainer: {
    height: 0.5 * screenHeight,
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
    backgroundColor: Colors.default.locations,
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
    width: 0.06758 * screenWidth,
    height: 0.087773 * screenWidth,
    position: "absolute",
    right: 0.035 * screenWidth,
    // top: 0.01375 * screenHeight,
  },
  contactUsText: {
    fontFamily: "poppins-regular",
    fontSize: 0.02 * screenHeight,
    color: Colors.default.back,
  },
  contactUsIcon: {
    width: 0.025 * screenWidth,
    height: 1.5 * 0.025 * screenWidth,
  },
  contactUsButton: {
    aspectRatio: 1,
    width: 0.08 * screenWidth,
    borderRadius: 0.04 * screenWidth,
    backgroundColor: Colors.default.locations,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 3,
    elevation: 2,
  },
  footer: {
    // height: 0.14 * screenHeight,
    flexDirection: "row",
    flexGrow: 1,
    width: "83.888%",
    // borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
