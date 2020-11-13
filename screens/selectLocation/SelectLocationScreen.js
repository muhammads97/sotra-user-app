import * as React from "react";
import { View, Dimensions, Image } from "react-native";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Icons from "../../constants/Icons";
import styles from "./style";
import Header from "../../components/header/Header";
import Colors from "../../constants/Colors";
import Translations from "../../constants/Translations";
import CurrentLocation from "../../components/currentLocationButton";
import RoundEdgeButton from "../../components/button/RoundEdge";
import { useDispatch, useSelector } from "react-redux";
import { resetRequestStatus, addAddress } from "../../redux/clientSlice";
const screenWidth = Math.round(Dimensions.get("window").width);

export default function SelectLocationScreen(props) {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.client.status);
  const error = useSelector((state) => state.client.error);
  const rtl = useSelector((state) => state.client.rtl);
  const backText = props.route.params.backText;
  let address = props.route.params.state;
  const [region, setRegion] = React.useState({
    longitude: 30.20485,
    latitude: 27.79961,
    longitudeDelta: 11,
    latitudeDelta: 8,
  });

  const map = React.useRef();

  React.useEffect(() => {
    dispatch(resetRequestStatus());
    Permissions.getAsync(Permissions.LOCATION).then((locationPermission) => {
      if (locationPermission.status != "granted") {
        Permissions.askAsync(Permissions.LOCATION)
          .then((locationPermission2) => {
            if (locationPermission2.status != "granted") {
              throw new Error("Location permission not granted");
            }
          })
          .catch((reason) => console.log(reason));
      }
    });
  }, []);

  const setLocationState = async () => {
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
    map.current.animateToRegion(region, 1500);
  };

  const onRegionChange = (region) => {
    setRegion(region);
  };
  const onPressSave = () => {
    address.latitude = region.latitude;
    address.longitude = region.longitude;
    dispatch(addAddress({ address }));
  };

  if (status == "succeeded") {
    setTimeout(() => {
      props.navigation.goBack();
      props.navigation.goBack();
    }, 10);
  }

  return (
    <View style={styles.container}>
      <Header
        nav={props.navigation}
        backText={backText}
        elevation={0}
        text={Translations.t("selectLocation")}
        icon={Icons.hanger}
        style={{ backgroundColor: Colors.primary }}
        iconStyle={[
          styles.headerIcon,
          rtl ? { left: 0.05 * screenWidth } : { right: 0.05 * screenWidth },
        ]}
        textStyle={styles.headerText}
      />
      <View style={styles.mapOuterContainer}>
        <View style={styles.mapContainer}>
          <MapView
            ref={map}
            style={styles.mapStyle}
            zoomEnabled={true}
            showsCompass={true}
            showsUserLocation={true}
            onRegionChangeComplete={(reg) => onRegionChange(reg)}
            onMapReady={() => setLocationState()}
          ></MapView>
          <Image
            source={Icons.locationTag}
            resizeMode={"contain"}
            style={styles.picker}
          />
          <CurrentLocation onPress={() => setLocationState()} />
        </View>
      </View>
      <View style={styles.footer}>
        <RoundEdgeButton
          text={Translations.t("saveAddress")}
          onPress={() => onPressSave()}
        />
      </View>
    </View>
  );
}
