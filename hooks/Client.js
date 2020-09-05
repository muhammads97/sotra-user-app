import endPoints from "../constants/endPoints";
import { Notifications } from "expo";
// import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as Font from "expo-font";
import * as SecureStore from "expo-secure-store";
import { Platform, Vibration } from "react-native";

export class Client {
  constructor() {}

  async prepareResources(callback) {
    let loggedin = false;
    await this.loadAssets();
    let token = await SecureStore.getItemAsync("token");
    token =
      "eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZSI6IisyMDEwMjE3MTc4OTIiLCJsYXN0X2xvZ2luIjoxNTk4MDMxOTAxfQ.SVzWKKPZJjLCf9qpRYmn9JOUNCMnJa51QomVVJgT_gU";
    if (token != null) {
      let user = await this.authClient(token);
      if (user != null) {
        user.token = token;
        this.user = user;
        loggedin = true;
      }
    }
    callback(loggedin);
  }
  async authClient(token) {
    let res = await this.getUser(token);
    return res;
  }
  async loadAssets() {
    // Load fonts
    await Font.loadAsync({
      "poppins-black": require("../assets/fonts/poppins/Poppins-Black.ttf"),
      "poppins-black-italic": require("../assets/fonts/poppins/Poppins-BlackItalic.ttf"),
      "poppins-bold": require("../assets/fonts/poppins/Poppins-Bold.ttf"),
      "poppins-bold-italic": require("../assets/fonts/poppins/Poppins-BoldItalic.ttf"),
      "poppins-extra-bold": require("../assets/fonts/poppins/Poppins-ExtraBold.ttf"),
      "poppins-extra-bold-italic": require("../assets/fonts/poppins/Poppins-ExtraBoldItalic.ttf"),
      "poppins-extra-light": require("../assets/fonts/poppins/Poppins-ExtraLight.ttf"),
      "poppins-extra-light-italic": require("../assets/fonts/poppins/Poppins-ExtraLightItalic.ttf"),
      "poppins-italic": require("../assets/fonts/poppins/Poppins-Italic.ttf"),
      "poppins-light": require("../assets/fonts/poppins/Poppins-Light.ttf"),
      "poppins-light-italic": require("../assets/fonts/poppins/Poppins-LightItalic.ttf"),
      "poppins-medium": require("../assets/fonts/poppins/Poppins-Medium.ttf"),
      "poppins-medium-italic": require("../assets/fonts/poppins/Poppins-MediumItalic.ttf"),
      "poppins-regular": require("../assets/fonts/poppins/Poppins-Regular.ttf"),
      "poppins-semi-bold": require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
      "poppins-semi-bold-italic": require("../assets/fonts/poppins/Poppins-SemiBoldItalic.ttf"),
      "poppins-thin": require("../assets/fonts/poppins/Poppins-Thin.ttf"),
      "poppins-thin-italic": require("../assets/fonts/poppins/Poppins-ThinItalic.ttf"),
    });
  }

  async login(phone) {
    phone = this.adjustPhone(phone);
    if (phone == null || phone.length != 13)
      return { sent: false, error: "#E" };
    this.phone = phone;
    let response = await fetch(endPoints.login.url, {
      method: endPoints.login.methods.post,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "user-type": "client",
      },
      body: JSON.stringify({
        phone: phone,
      }),
    });

    if (response.ok) {
      return {
        sent: true,
      };
    } else {
      let j = await response.json();
      return {
        sent: false,
        error: j.message,
      };
    }
  }
  adjustPhone(phone) {
    if (phone.startsWith("+")) {
      return phone;
    } else if (phone.startsWith("2")) {
      return "+" + phone;
    } else if (phone.startsWith("0")) {
      return "+2" + phone;
    } else {
      return null;
    }
  }
  async verify(phone, code, username) {
    phone = this.adjustPhone(phone);
    let response = await fetch(endPoints.verify.url, {
      method: endPoints.verify.methods.post,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "user-type": "client",
      },
      body: JSON.stringify({
        phone: phone,
        verification_code: code,
      }),
    });
    if (response.ok) {
      let j = await response.json();
      let token = j.auth_token;
      SecureStore.setItemAsync("token", token);
      let user = await this.authClient(token);
      user.token = token;
      this.user = user;
      return {
        ok: true,
      };
    } else {
      let j = await response.json();
      return {
        ok: false,
        error: j.message,
      };
    }
  }
  async submitUserName(username) {
    let response = await fetch(endPoints.client.url, {
      method: endPoints.client.methods.patch,
      headers: {
        Accept: endPoints.client.accept,
        "Content-Type": endPoints.client.contentType,
        Authorization: `Bearer ${this.user.token}`,
        "user-type": "client",
      },
      body: JSON.stringify({
        name: username,
      }),
    });
    if (response.ok) {
      this.user.name = username;
    }
  }
  async getUser(token) {
    let response = await fetch(endPoints.client.url, {
      method: endPoints.client.methods.get,
      headers: {
        Accept: endPoints.client.accept,
        "Content-Type": endPoints.client.contentType,
        Authorization: `Bearer ${token}`,
        "user-type": "client",
      },
    });
    if (response.ok) {
      let j = await response.json();
      return j.client;
    } else return null;
  }

  async getAddresses() {
    let response = await fetch(endPoints.addresses.url, {
      method: endPoints.addresses.methods.get,
      headers: {
        Accept: endPoints.addresses.accept,
        "Content-Type": endPoints.addresses.contentType,
        Authorization: `Bearer ${this.user.token}`,
        "user-type": "client",
      },
    });
    if (response.ok) {
      let json = await response.json();
      return json.addresses;
    } else {
      return null;
    }
  }

  async getAddress(id) {
    let response = await fetch(endPoints.addresses.url + `/${id}`, {
      method: endPoints.addresses.methods.get,
      headers: {
        Accept: endPoints.addresses.accept,
        "Content-Type": endPoints.addresses.contentType,
        Authorization: `Bearer ${this.user.token}`,
        "user-type": "client",
      },
    });
    if (response.ok) {
      let json = await response.json();
      return json.address;
    } else {
      return null;
    }
  }

  async placeOrder(address) {
    let response = await fetch(endPoints.pickup.url, {
      method: endPoints.pickup.methods.post,
      headers: {
        Accept: endPoints.pickup.accept,
        "Content-Type": endPoints.pickup.contentType,
        Authorization: `Bearer ${this.user.token}`,
        "user-type": "client",
      },
      body: JSON.stringify({
        address_id: address.id,
      }),
    });
    // return { created: true };
    // console.log(response.status);
    if (response.status == 201) {
      return {
        created: true,
      };
    } else {
      return {
        created: false,
        error: await response.json(),
      };
    }
  }
  async addAddress(address) {
    let response = await fetch(endPoints.addresses.url, {
      method: endPoints.addresses.methods.post,
      headers: {
        Accept: endPoints.addresses.accept,
        "Content-Type": endPoints.addresses.contentType,
        Authorization: `Bearer ${this.user.token}`,
        "user-type": "client",
      },
      body: JSON.stringify({
        name: address.name,
        street: address.street,
        latitude: address.latitude,
        longitude: address.longitude,
        floor: address.floor,
        building_number: address.building,
        additional_directions: address.dir,
        apt: address.apartment,
      }),
    });
    if (response.status == 201) {
      let json = await response.json();
      return true;
    } else {
      return false;
    }
  }
  async updateUser(name, cbd) {
    let response = await fetch(endPoints.client.url, {
      method: endPoints.client.methods.patch,
      headers: {
        Accept: endPoints.client.accept,
        "Content-Type": endPoints.client.contentType,
        Authorization: `Bearer ${this.user.token}`,
        "user-type": "client",
      },
      body: JSON.stringify({
        name: name,
        call_before_delivery: cbd,
      }),
    });
    if (response.status == 200) {
      this.user.name = name;
      this.user.call_before_delivery = cbd;
      return true;
    } else {
      return false;
    }
  }
  async deleteAddress(id) {
    let response = await fetch(endPoints.addresses.url + "/" + id.toString(), {
      method: endPoints.addresses.methods.delete,
      headers: {
        Accept: endPoints.addresses.accept,
        "Content-Type": endPoints.addresses.contentType,
        Authorization: `Bearer ${this.user.token}`,
        "user-type": "client",
      },
    });
    // console.log(response.status);
    if (response.status == 204) {
      // console.log("success");
      return true;
    } else {
      // console.log(await response.text());
      return false;
    }
  }
  getName() {
    return this.user.name;
  }
  getCBD() {
    return this.user.call_before_delivery;
  }

  async getLocations(region) {
    let response = await fetch(endPoints.locations.url, {
      method: endPoints.locations.methods.get,
      headers: {
        Accept: endPoints.locations.accept,
        "Content-Type": endPoints.locations.contentType,
        Authorization: `Bearer ${this.user.token}`,
        "user-type": "client",
      },
    });
    if (response.ok) {
      let l = await response.json();
      return l.locations;
    } else {
      return null;
    }
  }
  async getPriceList() {
    let response = await fetch(endPoints.items.url, {
      method: endPoints.items.methods.get,
      headers: {
        Accept: endPoints.items.accept,
        "Content-Type": endPoints.items.contentType,
        Authorization: `Bearer ${this.user.token}`,
        "user-type": "client",
      },
    });
    if (response.ok) {
      let l = await response.json();
      return l.items;
    } else {
      return null;
    }
  }
  async getOrders() {
    let response = await fetch(endPoints.orders.url + "/all", {
      method: endPoints.orders.methods.get,
      headers: {
        Accept: endPoints.orders.accept,
        "Content-Type": endPoints.orders.contentType,
        Authorization: `Bearer ${this.user.token}`,
        "user-type": "client",
      },
    });
    if (response.ok) {
      let l = await response.json();
      return l;
    } else {
      return null;
    }
  }
  async getPickups() {
    let response = await fetch(endPoints.pickups.url, {
      method: endPoints.pickups.methods.get,
      headers: {
        Accept: endPoints.pickups.accept,
        "Content-Type": endPoints.pickups.contentType,
        Authorization: `Bearer ${this.user.token}`,
        "user-type": "client",
      },
    });
    if (response.ok) {
      let l = await response.json();
      return l;
    } else {
      return null;
    }
  }
  async getOrderItems(id) {
    let response = await fetch(
      endPoints.orders.url + "/" + id + "/order_items",
      {
        method: endPoints.orders.methods.get,
        headers: {
          Accept: endPoints.orders.accept,
          "Content-Type": endPoints.orders.contentType,
          Authorization: `Bearer ${this.user.token}`,
          "user-type": "client",
        },
      }
    );
    if (response.ok) {
      let l = await response.json();
      return l.items;
    } else {
      return null;
    }
  }
  async rateOrder(rate, id) {
    let response = await fetch(endPoints.orders.url + "/" + id + "/rate", {
      method: endPoints.orders.methods.patch,
      headers: {
        Accept: endPoints.orders.accept,
        "Content-Type": endPoints.orders.contentType,
        Authorization: `Bearer ${this.user.token}`,
        "user-type": "client",
      },
      body: JSON.stringify({
        rating: rate,
      }),
    });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }
  async cancelPickup(id) {
    let response = await fetch(endPoints.cancelPickup.url + "/" + id, {
      method: endPoints.cancelPickup.methods.patch,
      headers: {
        Accept: endPoints.cancelPickup.accept,
        "Content-Type": endPoints.cancelPickup.contentType,
        Authorization: `Bearer ${this.user.token}`,
        "user-type": "client",
      },
    });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }
  async getService(id) {
    let response = await fetch(endPoints.services.url + "/" + id, {
      method: endPoints.services.methods.get,
      headers: {
        Accept: endPoints.services.accept,
        "Content-Type": endPoints.services.contentType,
        Authorization: `Bearer ${this.user.token}`,
        "user-type": "client",
      },
    });
    if (response.ok) {
      let s = await response.json();
      return s.service;
    } else {
      return null;
    }
  }

  async setupNotifications(nav) {
    await this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener((notification) =>
      this._handleNotification(notification, nav)
    );
    if (this._notificationSubscription.key > 0) {
      this._notificationSubscription.remove();
    }
    let response = await fetch(endPoints.client.url, {
      method: endPoints.client.methods.patch,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.user.token}`,
        "user-type": "client",
      },
      body: JSON.stringify({
        notification_token: this.pushToken,
      }),
    });
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      this.pushToken = token;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  _handleNotification = (notification, nav) => {
    // console.log(notification);
    if (notification.origin == "selected") {
      nav.navigate("BottomTab", {
        init: "Orders",
        rootNavigation: nav,
      });
    }
  };

  // Called when a notification comes in while the app is foregrounded
  onReceived = (notification) => {
    // console.log("received", notification);
    // this.setState({ notification });
  };

  // Called when a user taps on or interacts with a notification, whether the app is foregrounded, backgrounded, or closed.
  onResponseReceived = (response) => {
    // console.log("response", response);
  };
}
