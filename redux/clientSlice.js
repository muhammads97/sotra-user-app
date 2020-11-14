import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { call } from "../api/apiCall";
import * as SecureStore from "expo-secure-store";
import * as Localization from "expo-localization";
import { Updates } from "expo";
import Translations from "../constants/Translations";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

import { loginRequest, verificationRequest } from "../api/loginRequestCreators";
import {
  getClientRequest,
  updateNameRequest,
  updateCallBeforeDeliveryRequest,
  getAddressesRequest,
  addAddressRequest,
  deleteAddressRequest,
  updateUserDataRequest,
  addReferralRequest,
  getPricesRequest,
  getConfig,
} from "../api/clientDataRequestCreator";
import { I18nManager } from "react-native";

const initialState = {
  loading: true,
  loggingInStatus: "idle",
  loggedIn: false,
  name: "",
  phone: "",
  email: "",
  birthDate: "",
  gender: "",
  call_before_delivery: false,
  referral_code: "",
  status: "idle",
  error: null,
  token: "000",
  cached: false,
  addresses: [],
  addressesCached: false,
  balance: 0,
  newUser: false,
  referralStatus: "idle",
  items: [],
  itemsCached: false,
  language: "",
  config: {},
  notification: null,
};

export const initialization = createAsyncThunk(
  "client/initialization",
  async () => {
    await SplashScreen.preventAutoHideAsync();
    await loadAssets();
    let token = await SecureStore.getItemAsync("token");
    let language = await SecureStore.getItemAsync("language");
    if (language == null) {
      language = Localization.locale;
    }
    Translations.locale = language;
    if (language == "ar") {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
    if (token) {
      try {
        const response = await call(getClientRequest(token));
        return {
          client: response.data.client,
          loggedIn: true,
          token: token,
          language,
        };
      } catch (error) {
        return {
          loggedIn: false,
          error: error.response.data.message,
        };
      }
    } else {
      return {
        loggedIn: false,
        error: "no token saved",
      };
    }
  }
);

export const login = createAsyncThunk("client/login", async ({ phone }) => {
  try {
    const response = await call(loginRequest(phone));
    return {
      sent: true,
      phone: phone,
    };
  } catch (error) {
    return {
      sent: false,
      error: error.response.data.message,
      phone: phone,
    };
  }
});

export const verify = createAsyncThunk(
  "client/verify",
  async ({ phone, code }) => {
    try {
      const response = await call(verificationRequest(phone, code));
      await SecureStore.setItemAsync("token", response.data.auth_token);
      return {
        loggedIn: true,
        phone: phone,
        token: response.data.auth_token,
        newUser: response.data.new_client,
      };
    } catch (error) {
      return {
        loggedIn: false,
        error: error.response.data.message,
        phone: phone,
      };
    }
  }
);
export const loadConfig = createAsyncThunk(
  "clinet/loadConfig",
  async ({ key }, { getState }) => {
    try {
      const response = await call(getConfig(key));
      return {
        success: true,
        value: response.data.value,
        key,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response.data.message,
      };
    }
  }
);
export const loadClient = createAsyncThunk(
  "client/loadClient",
  async (data, { getState }) => {
    let token = getState().client.token;
    try {
      const response = await call(getClientRequest(token));
      if (response.data.client.name != getState().client.name) {
        if (getState().client.name != null && getState().client.name != "") {
          await call(updateNameRequest(token, getState().client.name));
          response.data.client.name = getState().client.name;
        }
      }
      return {
        client: response.data.client,
        loggedIn: true,
      };
    } catch (error) {
      return {
        loggedIn: false,
        error: error.response.data.message,
      };
    }
  }
);

export const setName = createAsyncThunk(
  "client/setName",
  ({ name }, { getState }) => {
    let token = getState().client.token;
    try {
      call(updateNameRequest(token, name));
      return {
        success: true,
        name: name,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response.data.message,
      };
    }
  }
);

export const setCallBeforeDelivery = createAsyncThunk(
  "client/setCallBeforeDelivery",
  ({ value }, { getState }) => {
    let token = getState().client.token;
    try {
      call(updateCallBeforeDeliveryRequest(token, value));
      return {
        success: true,
        value: value,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response.data.message,
      };
    }
  }
);

export const loadAddresses = createAsyncThunk(
  "client/loadAddresses",
  async (data, { getState }) => {
    const token = getState().client.token;
    try {
      const response = await call(getAddressesRequest(token));
      return {
        success: true,
        addresses: response.data.addresses,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response.data.message,
      };
    }
  }
);

export const addAddress = createAsyncThunk(
  "client/addAddress",
  async ({ address }, { getState }) => {
    const token = getState().client.token;
    try {
      const response = await call(addAddressRequest(token, address));
      return {
        success: true,
        address: response.data.address,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response.data.message,
      };
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "client/deleteAddress",
  async ({ index }, { getState }) => {
    const token = getState().client.token;
    const address = getState().client.addresses[index];
    try {
      const response = await call(deleteAddressRequest(token, address.id));
      return {
        success: true,
        index: index,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response.data.message,
      };
    }
  }
);

export const updateUserData = createAsyncThunk(
  "client/updateUserData",
  async ({ userData }, { getState }) => {
    const token = getState().client.token;
    let data = {};
    if (userData.name != null && userData.name != "") {
      data["name"] = userData.name;
    }
    if (userData.email != null && userData.email != "") {
      data["email"] = userData.email;
    }
    if (userData.gender != null && userData.gender != "") {
      data["gender"] = userData.gender;
    }
    if (userData.birthDate != null && userData.birthDate != "") {
      data["birth_date"] = userData.birthDate;
    }
    try {
      const response = await call(updateUserDataRequest(token, data));
      return {
        success: true,
        user: response.data.client,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response.data.message,
      };
    }
  }
);

export const addReferralCode = createAsyncThunk(
  "client/addReferralCode",
  async ({ referral }, { getState }) => {
    const token = getState().client.token;
    try {
      await call(addReferralRequest(token, referral));
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response.data.message,
      };
    }
  }
);

export const loadPrices = createAsyncThunk(
  "client/loadPrices",
  async (data, { getState }) => {
    const token = getState().client.token;
    try {
      const response = await call(getPricesRequest(token));
      return {
        success: true,
        items: response.data.items,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response.data.message,
      };
    }
  }
);

export const setLanguage = createAsyncThunk(
  "client/setLanguage",
  async ({ language }, { getState }) => {
    SecureStore.setItemAsync("language", language);
    Translations.locale = language;
    if (language == "ar") {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
    try {
      await call(updateUserDataRequest(token, { lang: language }));
      Updates.reload();
      return {
        success: true,
        language,
      };
    } catch (error) {
      Updates.reload();
      return {
        success: false,
        error: error.response.data.message,
      };
    }
  }
);

export const setPushToken = createAsyncThunk(
  "client/setPushToken",
  async (data, { getState }) => {
    const token = getState().client.token;
    const pushToken = await registerForPushNotificationsAsync();
    const lang = getState().client.language;
    try {
      const response = await call(
        updateUserDataRequest(token, { notification_token: pushToken, lang })
      );
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response.data.message,
      };
    }
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    resetRequestStatus: {
      reducer(state, action) {
        state.loggingInStatus = "idle";
        state.status = "idle";
        state.loggingIn = false;
        state.error = null;
      },
    },
    setCached: {
      reducer(state, action) {
        state.cached = action.payload.cached;
      },
      prepare(cached) {
        return {
          payload: {
            cached,
          },
        };
      },
    },
    setAddressesCached: {
      reducer(state, action) {
        state.addressesCached = action.payload.cached;
      },
      prepare(cached) {
        return {
          payload: {
            cached,
          },
        };
      },
    },
    makeOldUser: {
      reducer(state, action) {
        state.newUser = false;
      },
    },
    setItemsCached: {
      reducer(state, action) {
        state.itemsCached = action.payload.cached;
      },
      prepare(cached) {
        return {
          payload: {
            cached,
          },
        };
      },
    },
    setNotification: {
      reducer(state, action) {
        state.notification = action.payload.notification;
      },
      prepare(notification) {
        return {
          payload: {
            notification,
          },
        };
      },
    },
  },
  extraReducers: {
    [setLanguage.fulfilled]: (state, action) => {
      state.language = action.payload.language;
    },
    [initialization.pending]: (state, action) => {
      state.status = "loading";
    },
    [initialization.fulfilled]: (state, action) => {
      state.status = "succeeded";
      if (action.payload.loggedIn) {
        state.name = action.payload.client.name;
        state.phone = action.payload.client.phone;
        state.call_before_delivery = action.payload.client.call_before_delivery;
        state.balance = action.payload.client.wallet_balance;
        state.email = action.payload.client.email;
        state.birthDate = action.payload.client.birth_date;
        state.gender = action.payload.client.gender;
        state.token = action.payload.token;
        state.referral_code = action.payload.client.referral_code;
        state.language = action.payload.language;
        state.loggedIn = true;
      } else {
        state.error = action.payload.error;
      }
      state.loading = false;
    },
    [initialization.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [login.pending]: (state, action) => {
      state.loggingInStatus = "loading";
    },
    [login.fulfilled]: (state, action) => {
      if (action.payload.sent) {
        state.phone = action.payload.phone;
        state.loggingIn = true;
        state.loggingInStatus = "succeeded";
      } else {
        state.loggingInStatus = "failed";
        state.error = action.payload.error;
      }
    },
    [login.rejected]: (state, action) => {
      state.loggingInStatus = "failed";
      state.error = action.error.message;
    },
    [verify.pending]: (state, action) => {
      state.status = "loading";
    },
    [verify.fulfilled]: (state, action) => {
      if (action.payload.loggedIn) {
        state.token = action.payload.token;
        state.status = "succeeded";
        state.phone = action.payload.phone;
        state.loggedIn = true;
        state.newUser = action.payload.newUser;
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [verify.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addReferralCode.pending]: (state, action) => {
      state.referralStatus = "loading";
    },
    [addReferralCode.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.referralStatus = "succeeded";
      } else {
        state.referralStatus = "failed";
        state.error = action.payload.error;
      }
    },
    [addReferralCode.rejected]: (state, action) => {
      state.referralStatus = "failed";
      state.error = action.error.message;
    },
    [loadClient.pending]: (state, action) => {
      state.status = "loading";
    },
    [loadClient.fulfilled]: (state, action) => {
      state.status = "succeeded";
      if (action.payload.loggedIn) {
        state.name = action.payload.client.name;
        state.phone = action.payload.client.phone;
        state.call_before_delivery = action.payload.client.call_before_delivery;
        state.balance = action.payload.client.wallet_balance;
        state.email = action.payload.client.email;
        state.birthDate = action.payload.client.birth_date;
        state.gender = action.payload.client.gender;
        state.referral_code = action.payload.client.referral_code;
        state.loggedIn = true;
      } else {
        state.loggedIn = false;
      }
    },
    [loadClient.rejected]: (state, action) => {
      state.status = "failed";
      state.loggedIn = false;
      state.error = action.error.message;
    },
    [setCallBeforeDelivery.pending]: (state, action) => {
      state.status = "loading";
    },
    [setCallBeforeDelivery.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.call_before_delivery = action.payload.value;
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [setCallBeforeDelivery.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [setName.pending]: (state, action) => {
      state.status = "loading";
    },
    [setName.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.name = action.payload.name;
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [setName.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [updateUserData.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateUserData.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.gender = action.payload.user.gender;
        state.birthDate = action.payload.user.birth_date;
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [updateUserData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [loadAddresses.pending]: (state, action) => {
      state.status = "loading";
    },
    [loadAddresses.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.addresses = action.payload.addresses;
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [loadAddresses.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addAddress.pending]: (state, action) => {
      state.status = "loading";
    },
    [addAddress.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.addresses.push(action.payload.address);
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [addAddress.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [deleteAddress.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteAddress.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.addresses.splice(action.payload.index, 1);
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [deleteAddress.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [loadPrices.pending]: (state, action) => {
      state.status = "loading";
    },
    [loadPrices.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.items = action.payload.items;
      } else {
        state.status = " failed";
        state.error = action.payload.error;
      }
    },
    [loadPrices.rejected]: (state, action) => {
      state.status = " failed";
      state.error = action.error.message;
    },
    [loadConfig.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.config[action.payload.key] = action.payload.value;
      }
    },
    [setPushToken.pending]: (state, action) => {
      state.status = "loading";
    },
    [setPushToken.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [setPushToken.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default clientSlice.reducer;
export const {
  resetRequestStatus,
  setCached,
  setAddressesCached,
  makeOldUser,
  setItemsCached,
  setNotification,
} = clientSlice.actions;

const loadAssets = async () => {
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
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
