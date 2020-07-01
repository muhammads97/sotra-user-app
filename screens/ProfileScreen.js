import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import * as Colors from "../constants/Colors";
import * as Icons from "../constants/Icons";
import StickyHeader from "../components/StickyHeader";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Toggle from "../components/Toggle";
import { Client } from "../hooks/Client";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;

export default class ProfileScreen extends React.Component {
  constructor({ navigation, route }) {
    super();
    this.rootNav = route.params.rootNav;
    this.rootUpdateUser = route.params.updateUser;
    this.state = {
      addresses: [],
      loading: true,
      addressFont: 0.017 * screenHeight,
      headerElevation: 0,
      name: "",
      cbd: false,
    };
    this.backName = "Home Page";
    this.headerText = "Profile Settings";
  }
  onPressAddAddress() {
    this.rootNav.navigate("AddAddress", {
      backName: "Profile Settings",
      headerText: "Address",
      onBack: () => this.loadAddresses(),
    });
  }
  getAddress(address) {
    let building = address.building_number.toString();
    let streetAddress = address.street;
    let floor = address.floor.toString();
    let apt = address.apt.toString();
    let directions = address.additional_directions;
    address = "";
    if (building != null && building.length > 0) {
      address += building + " ";
    }
    if (streetAddress != null && streetAddress.length > 0) {
      address += streetAddress + ". ";
    }
    if (apt != null && apt.length > 0) {
      address += "Apartment NO. " + apt;
    }
    if (floor != null && floor.length > 0) {
      address += ", Floor NO. " + floor + ". ";
    }
    if (directions != null && directions.length > 0) {
      address += "(" + directions + ")";
    }
    return address;
  }
  reduceFont(l) {
    if (l.height > 41) {
      let f = this.state.addressFont - 0.25;
      this.setState({ addressFont: f });
    }
  }
  updateUser() {
    this.rootUpdateUser();
  }
  async componentDidMount() {
    this.setState({ name: globalThis.client.getName() });
    this.setState({ cbd: globalThis.client.getCBD() });
    await this.loadAddresses();
  }
  async loadAddresses() {
    let addresses = await globalThis.client.getAddresses();
    //get addresses
    if (addresses != null) {
      let l = [];
      for (let i = 0; i < addresses.length; i++) {
        let obj = {
          key: i,
          value: {
            id: addresses[i].id,
            name: addresses[i].name,
            street: this.getAddress(addresses[i]),
          },
        };
        l[i] = obj;
      }
      this.setState({ addresses: l });
    }
  }
  renderHeader = () => {
    var Sticky_header_View = (
      <View style={styles.header}>
        <Text style={styles.headerText}>{this.headerText}</Text>
        <Image
          source={Icons.default.profile.home}
          resizeMode={"contain"}
          style={styles.headerIcon}
        />
      </View>
    );
    return Sticky_header_View;
  };

  async toggleCBD(value) {
    let v = await globalThis.client.updateUser(this.state.name, value);
    if (v) {
      this.setState({ cbd: value });
    }
  }
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: 0.7166 * screenWidth,
          borderBottomWidth: 1,
          borderColor: Colors.default.back,
          marginBottom: 7.5,
          marginTop: 7.5,
        }}
      />
    );
  };

  async updateUsername(name) {
    this.setState({ name: name });
    let v = await globalThis.client.updateUser(name, this.state.cbd);
    if (v) {
      this.rootUpdateUser();
    }
  }
  deleteAddress(address) {
    Alert.alert(
      "Delete " + address.name + "?",
      "Are you sure you want to delete your address (" + address.name + ")?",
      [
        {
          text: "Delete",
          onPress: async () => {
            let v = await globalThis.client.deleteAddress(address.id);
            if (v) {
              this.loadAddresses();
            }
          },
        },
        {
          text: "Cancel",
        },
      ]
    );
  }

  adjustHeaderElevation(offset) {
    if (offset.y == 0 && this.state.headerElevation != 0) {
      this.setState({ headerElevation: 0 });
    } else if (offset.y != 0 && this.state.headerElevation == 0) {
      this.setState({ headerElevation: 5 });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StickyHeader
          navigator={this.rootNav}
          backName={this.backName}
          elevation={this.state.headerElevation}
          headerComponent={this.renderHeader()}
        />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={(e) =>
            this.adjustHeaderElevation(e.nativeEvent.contentOffset)
          }
        >
          <View style={styles.toggleView}>
            <Text style={styles.toggleText}>Call Me Before Delivery</Text>
            <Toggle
              style={styles.toggle}
              trackColor={{
                on: Colors.default.track.on,
                off: Colors.default.track.off,
              }}
              value={this.state.cbd}
              onValueChange={(value) => this.toggleCBD(value)}
              thumbColor={"#fff"}
            />
          </View>
          <View style={styles.usernameView}>
            <Text style={styles.usernameText}>Username</Text>
            <TextInput
              style={styles.usernameInput}
              value={this.state.name}
              placeholder={"Your Name"}
              onChangeText={(value) => this.updateUsername(value)}
            />
          </View>
          <View style={[styles.addressesView]}>
            <View style={styles.addressesHeader}>
              <Text style={styles.addressesHeaderText}>Addresses</Text>
              <TouchableOpacity
                style={styles.plusButton}
                activeOpacity={0.8}
                onPress={() => this.onPressAddAddress()}
              >
                <Image
                  source={Icons.default.plus}
                  style={styles.plusIcon}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            </View>
            {this.state.addresses.length == 0 ? (
              <Text style={styles.noAddresses}>
                You haven't set any addresses
              </Text>
            ) : (
              <FlatList
                style={styles.list}
                data={this.state.addresses}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.addressContainer}>
                      <View style={styles.addressNameContainer}>
                        <Text style={styles.addressName}>
                          {item.value.name}
                        </Text>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          activeOpacity={0.8}
                          onPress={() => this.deleteAddress(item.value)}
                        >
                          <Image
                            source={Icons.default.delete}
                            resizeMode={"contain"}
                            style={styles.deleteIcon}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={[
                          styles.address,
                          { fontSize: this.state.addressFont },
                        ]}
                        // numberOfLines={2}
                        onLayout={(e) => this.reduceFont(e.nativeEvent.layout)}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  list: {
    marginBottom: 0.034375 * screenHeight,
  },
  address: {
    fontFamily: "poppins-extra-light",
    fontSize: 0.017 * screenHeight,
    color: Colors.default.back,
    marginBottom: 8,
  },
  addressContainer: {
    // height: 50,
    backgroundColor: "#fff",
    width: 0.71777 * screenWidth,
    // borderWidth: 1,
  },
  addressNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // borderWidth: 1,
  },
  addressName: {
    fontFamily: "poppins-regular",
    fontSize: 0.02 * screenHeight,
    color: Colors.default.back,
  },
  deleteIcon: {
    width: 0.02 * screenWidth,
    height: 0.02 * screenWidth,
  },
  deleteButton: {
    width: 0.05 * screenWidth,
    height: 0.05 * screenWidth,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  noAddresses: {
    fontFamily: "poppins-light",
    fontSize: 0.012 * screenHeight,
    color: Colors.default.back,
    marginBottom: 0.034375 * screenHeight,
  },
  addressesView: {
    width: "85%",
    borderRadius: 0.01875 * screenHeight,
    backgroundColor: "#fff",
    elevation: 4,
    alignItems: "center",
    // minHeight: 0.104 * screenHeight,
    marginBottom: 0.0375 * screenHeight,
    flexGrow: 1,
  },
  addressesHeader: {
    width: "86.97%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0.034375 * screenHeight,
    marginBottom: 0.034375 * screenHeight,
  },
  addressesHeaderText: {
    fontFamily: "poppins-regular",
    fontSize: 0.025 * screenHeight,
    color: Colors.default.back,
  },
  plusButton: {
    width: 0.07 * screenWidth,
    aspectRatio: 1,
    borderRadius: 0.035 * screenWidth,
    elevation: 3,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    width: 0.03 * screenWidth,
    height: 0.03 * screenWidth,
  },
  usernameView: {
    width: "85%",
    height: 0.1875 * screenHeight,
    elevation: 4,
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 0.01875 * screenHeight,
    backgroundColor: "#fff",
    marginBottom: 0.03125 * screenHeight,
  },
  usernameText: {
    fontFamily: "poppins-regular",
    fontSize: 0.025 * screenHeight,
    color: Colors.default.back,
    textAlignVertical: "center",
    marginLeft: 0.05555 * screenWidth,
    marginBottom: 0.0125 * screenHeight,
  },
  usernameInput: {
    width: "86.86%",
    alignSelf: "center",
    borderBottomColor: Colors.default.input,
    borderBottomWidth: 1,
    fontFamily: "poppins-light",
    fontSize: 0.02 * screenHeight,
    textDecorationColor: Colors.default.input,
    color: Colors.default.back,
    marginTop: 0.0125 * screenHeight,
  },
  toggleView: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0.01 * screenHeight,
    marginBottom: 0.03 * screenHeight,
    // borderWidth: 1,
  },
  toggleText: {
    fontFamily: "poppins-regular",
    fontSize: 0.021 * screenHeight,
    color: Colors.default.back,
  },
  toggle: {
    // borderWidth: 1,
    width: 0.138 * screenWidth,

    // flexShrink: 1,
  },
  header: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.default.profile,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 10,
    borderRadius: 0.0333 * screenWidth,
    // borderWidth: 3,
  },
  headerText: {
    fontFamily: "poppins-medium",
    fontSize: 0.023 * screenHeight,
    color: "#fff",
    marginLeft: "6.5%",
  },
  headerIcon: {
    width: 0.064861 * screenWidth,
    height: 0.0869166 * screenWidth,
    position: "absolute",
    right: 0.04888 * screenWidth,
    // alignSelf: "flex-end",
    // marginTop: "5.5%",
    // marginLeft: "30.5%",
  },
});
