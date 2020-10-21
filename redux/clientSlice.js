import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { call } from "../api/apiCall";
import * as SecureStore from "expo-secure-store";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { loginRequest, verificationRequest } from "../api/loginRequestCreators";
import {
  getClientRequest,
  updateNameRequest,
  updateCallBeforeDeliveryRequest,
  getAddressesRequest,
  addAddressRequest,
  deleteAddressRequest,
} from "../api/clientDataRequestCreator";

const initialState = {
  loading: true,
  loggingInStatus: "idle",
  loggedIn: false,
  name: "",
  phone: "",
  call_before_delivery: false,
  status: "idle",
  error: null,
  token: "000",
  cached: false,
  addresses: [],
  balance: 0,
};

export const initialization = createAsyncThunk(
  "client/initialization",
  async () => {
    await SplashScreen.preventAutoHideAsync();
    await loadAssets();
    let token = await SecureStore.getItemAsync("token");
    if (token) {
      try {
        const response = await call(getClientRequest(token));
        return {
          client: response.data.client,
          loggedIn: true,
          token: token,
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

export const login = createAsyncThunk(
  "client/login",
  async ({ phone, name }) => {
    try {
      const response = await call(loginRequest(phone));
      return {
        sent: true,
        phone: phone,
        name: name,
      };
    } catch (error) {
      return {
        sent: false,
        error: error.response.data.message,
        phone: phone,
      };
    }
  }
);

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
  async ({ name }, { getState }) => {
    let token = getState().client.token;
    try {
      const response = await call(updateNameRequest(token, name));
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
  async ({ value }, { getState }) => {
    let token = getState().client.token;
    try {
      const response = await call(
        updateCallBeforeDeliveryRequest(token, value)
      );
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
  },
  extraReducers: {
    [initialization.pending]: (state, action) => {
      state.status = "loading";
    },
    [initialization.fulfilled]: (state, action) => {
      state.status = "succeeded";
      if (action.payload.loggedIn) {
        state.name = action.payload.client.name;
        state.phone = action.payload.client.phone;
        state.call_before_delivery = action.payload.client.call_before_delivery;
        state.token = action.payload.token;
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
        state.name = action.payload.name;
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
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [verify.rejected]: (state, action) => {
      state.status = "failed";
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
  },
});

export default clientSlice.reducer;
export const { resetRequestStatus, setCached } = clientSlice.actions;

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
