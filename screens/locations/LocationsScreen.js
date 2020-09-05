import * as React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Icons from "../../constants/Icons";
import styles from "./style";
import Header from "../../components/header/Header";

export default function LocationsScreen({ navigation, route }) {
  const rootNav = route.params.rootNav;
  const position = route.params.position;
  const backText = "Home Page";
  const headerText = "Our Locations";
  const map = React.useRef();
  const [region, setRegion] = React.useState({
    longitude: 30.20485,
    latitude: 27.79961,
    longitudeDelta: 11,
    latitudeDelta: 8,
  });

  const [mapStyle, setMapStyle] = React.useState({});
  const [locations, setLocations] = React.useState([]);

  const locationPermission = async () => {
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
  };

  const setLocationState = async () => {
    let location;
    if (position == null) {
      location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        mapContainer: 5000,
        timeout: 5000,
      });
    } else {
      location = {};
      location["coords"] = position;
    }

    let reg = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      longitudeDelta: 0.01,
      latitudeDelta: 0.01,
    };
    map.current.animateToRegion(reg, 1500);
    let ourLocations = await globalThis.client.getLocations(reg);
    if (ourLocations != null) {
      setLocations(ourLocations);
    }
  };

  const onMapReady = () => {
    setMapStyle(styles.mapStyle);
    setTimeout(() => setLocationState(), 100);
  };

  const onPressContactUs = () => {
    Linking.openURL("tel:+201205147358");
  };

  React.useEffect(() => {
    locationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        nav={rootNav}
        backText={backText}
        elevation={0}
        icon={Icons.location.home}
        text={headerText}
        iconStyle={styles.headerIcon}
      />
      <View style={styles.mapContainer}>
        <MapView
          ref={map}
          style={mapStyle}
          onMapReady={() => onMapReady()}
          zoomEnabled={true}
          showsCompass={true}
          showsUserLocation={true}
          onRegionChangeComplete={(reg) => setRegion(reg)}
        >
          {locations.map((marker, index) => (
            <MapView.Marker
              coordinate={{
                longitude: marker.longitude,
                latitude: marker.latitude,
              }}
              title={"Sotra"}
              description={"Sotra Service Point " + marker.id}
              key={index}
            >
              <Image
                source={Icons.locationTag}
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
          onPress={() => onPressContactUs()}
        >
          <Image
            source={Icons.call}
            resizeMode={"contain"}
            style={styles.contactUsIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
