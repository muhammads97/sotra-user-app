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
import StickyHeader from "../../components/header/StickyHeader";
import Icons from "../../constants/Icons";
import styles from "./style";
import Header from "../../components/header/Header";
import Colors from "../../constants/Colors";
import CurrentLocation from "../locations/currentLocationButton";
import RoundEdgeButton from "../../components/button/RoundEdge";

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
      accuracy: Location.Accuracy.Balanced,
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
        <Header
          nav={this.navigation}
          backText={this.backName}
          elevation={0}
          text={this.headerText}
          icon={Icons.hanger}
          style={{ backgroundColor: Colors.primary }}
          iconStyle={styles.headerIcon}
          textStyle={styles.headerText}
        />
        <View style={styles.mapOuterContainer}>
          <View style={styles.mapContainer}>
            <MapView
              ref={this.map}
              style={styles.mapStyle}
              onMapReady={() => this.onMapReady()}
              zoomEnabled={true}
              showsCompass={true}
              showsUserLocation={true}
              onRegionChangeComplete={this.onRegionChange.bind(this)}
            ></MapView>
            <Image
              source={Icons.locationTag}
              resizeMode={"contain"}
              style={styles.picker}
            />
            <CurrentLocation onPress={() => this.setLocationState()} />
          </View>
        </View>
        <View style={styles.footer}>
          <RoundEdgeButton
            text={"Save Address"}
            onPress={() => this.onPressSave()}
          />
        </View>
      </View>
    );
  }
}
