import * as React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Alert,
  Dimensions,
  StatusBar,
  Switch,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";
import Icons from "../../constants/Icons";
import { makeAddress } from "../../helpers/address";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Toggle from "../../components/Toggle";
import Header from "../../components/header/Header";
import styles from "./style";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;

export default function ProfileScreen({ navigation, route }) {
  const rootNav = route.params.rootNav;
  const rootUpdateUser = route.params.updateUser;
  const [addresses, setAddresses] = React.useState([]);
  const [loading, setLoadning] = React.useState(true);
  const [addressFont, setAddressFont] = React.useState(0.017 * screenHeight);
  const [headerElevation, setHeaderElevation] = React.useState(0);
  const [name, setName] = React.useState("");
  const [cbd, setCBD] = React.useState(false);
  const backText = "Home Page";
  const headerText = "Profile Settings";

  const onPressAddAddress = () => {
    rootNav.navigate("AddAddress", {
      backText: "Profile Settings",
      headerText: "Address",
      onBack: () => loadAddresses(),
    });
  };

  const reduceFont = (l) => {
    if (l.height > 41) {
      let f = addressFont - 0.25;
      setAddressFont(f);
    }
  };

  const load = async () => {
    setName(globalThis.client.getName());
    setCBD(globalThis.client.getCBD());
    loadAddresses();
  };
  const loadAddresses = async () => {
    let addrs = await globalThis.client.getAddresses();
    if (addrs != null) {
      let l = [];
      for (let i = 0; i < addrs.length; i++) {
        let obj = {
          key: i,
          value: {
            id: addrs[i].id,
            name: addrs[i].name,
            street: makeAddress(addrs[i]),
          },
        };
        l[i] = obj;
      }
      setAddresses(l);
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  const toggleCBD = async (value) => {
    let v = await globalThis.client.updateUser(name, value);
    if (v) {
      setCBD(value);
    }
  };
  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: 0.7166 * screenWidth,
          borderBottomWidth: 1,
          borderColor: Colors.back,
          marginBottom: 7.5,
          marginTop: 7.5,
        }}
      />
    );
  };

  const updateUsername = async (name) => {
    setName(name);
    let v = await globalThis.client.updateUser(name, cbd);
    if (v) {
      rootUpdateUser();
    }
  };
  const deleteAddress = (address) => {
    Alert.alert(
      "Delete " + address.name + "?",
      "Are you sure you want to delete your address (" + address.name + ")?",
      [
        {
          text: "Delete",
          onPress: async () => {
            let v = await globalThis.client.deleteAddress(address.id);
            if (v) {
              loadAddresses();
            }
          },
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  const adjustHeaderElevation = (offset) => {
    if (offset.y == 0 && headerElevation != 0) {
      setHeaderElevation(0);
    } else if (offset.y != 0 && headerElevation == 0) {
      setHeaderElevation(5);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        nav={rootNav}
        backText={backText}
        elevation={headerElevation}
        icon={Icons.profile.home}
        style={{ backgroundColor: Colors.profile }}
        textStyle={styles.headerText}
        text={headerText}
        iconStyle={styles.headerIcon}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => adjustHeaderElevation(e.nativeEvent.contentOffset)}
        scrollEventThrottle={16}
      >
        <View style={styles.toggleView}>
          <Text style={styles.toggleText}>Call Me Before Delivery</Text>
          {Platform.OS == "ios" ? (
            <Switch
              trackColor={{ false: Colors.track.off, true: Colors.track.on }}
              // thumbColor={"#fff"}
              // style={styles.toggle}
              ios_backgroundColor={Colors.track.off}
              value={cbd}
              onValueChange={(value) => toggleCBD(value)}
            />
          ) : (
            <Toggle
              style={styles.toggle}
              trackColor={{
                on: Colors.track.on,
                off: Colors.track.off,
              }}
              value={cbd}
              onValueChange={(value) => toggleCBD(value)}
              thumbColor={"#fff"}
            />
          )}
        </View>
        <View style={styles.usernameView}>
          <Text style={styles.usernameText}>Username</Text>
          <TextInput
            style={styles.usernameInput}
            value={name}
            placeholder={"Your Name"}
            onChangeText={(value) => updateUsername(value)}
          />
        </View>
        <View style={[styles.addressesView]}>
          <View style={styles.addressesHeader}>
            <Text style={styles.addressesHeaderText}>Addresses</Text>
            <TouchableOpacity
              style={styles.plusButton}
              activeOpacity={0.8}
              onPress={() => onPressAddAddress()}
            >
              <Image
                source={Icons.plus}
                style={styles.plusIcon}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>
          {addresses.length == 0 ? (
            <Text style={styles.noAddresses}>
              You haven't set any addresses
            </Text>
          ) : (
            <FlatList
              style={styles.list}
              data={addresses}
              ItemSeparatorComponent={FlatListItemSeparator}
              renderItem={({ item }) => {
                return (
                  <View style={styles.addressContainer}>
                    <View style={styles.addressNameContainer}>
                      <Text style={styles.addressName}>{item.value.name}</Text>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        activeOpacity={0.8}
                        onPress={() => deleteAddress(item.value)}
                      >
                        <Image
                          source={Icons.delete}
                          resizeMode={"contain"}
                          style={styles.deleteIcon}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={[styles.address, { fontSize: addressFont }]}
                      onLayout={(e) => reduceFont(e.nativeEvent.layout)}
                    >
                      {item.value.street}
                    </Text>
                  </View>
                );
              }}
              keyExtractor={(item) => item.key.toString()}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
