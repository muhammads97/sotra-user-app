import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { call } from "../api/apiCall";
import {
  placeOrderRequest,
  cancelPickupRequest,
  getWaitingRequest,
  getPickingRequest,
  getServingRequest,
  getDeliveringRequest,
  getOrderItemsRequest,
  rateOrderRequest,
} from "../api/ordersRequestCreator";

const initialState = {
  waiting: [],
  picking: [],
  serving: [],
  delivering: [],
  archived: [],
  status: "idle",
  error: null,
  waitingCached: false,
  pickingCached: false,
  servingCached: false,
  deliveringCached: false,
  archivedCached: false,
};

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ address_index }, { getState }) => {
    const token = getState().client.token;
    const address = getState().client.addresses[address_index];
    try {
      const response = await call(placeOrderRequest(token, address.id));
      return {
        order: response.data,
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

export const cancelOrder = createAsyncThunk(
  "orders/placeOrder",
  async (data, { getState }) => {
    const token = getState().client.token;
    try {
      const response = await call(
        cancelPickupRequest(token, getState().orders.picking.id)
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

export const loadWaiting = createAsyncThunk(
  "orders/loadWaiting",
  async (data, { getState }) => {
    const token = getState().client.token;
    try {
      const response = await call(getWaitingRequest(token));
      return {
        orders: response.data,
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

export const loadPicking = createAsyncThunk(
  "orders/loadPicking",
  async (data, { getState }) => {
    const token = getState().client.token;
    try {
      const response = await call(getPickingRequest(token));
      return {
        orders: response.data,
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

export const loadServing = createAsyncThunk(
  "orders/loadServing",
  async (data, { getState }) => {
    const token = getState().client.token;
    try {
      const response = await call(getServingRequest(token));
      return {
        orders: response.data,
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

export const loadDelivering = createAsyncThunk(
  "orders/loadDelivering",
  async (data, { getState }) => {
    const token = getState().client.token;
    try {
      const response = await call(getDeliveringRequest(token));
      return {
        orders: response.data,
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

export const loadArchived = createAsyncThunk(
  "orders/loadArchived",
  async (data, { getState }) => {
    const token = getState().client.token;
    try {
      const response = await call(getArchivedRequest(token));
      return {
        orders: response.data,
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

export const loadOrderItems = createAsyncThunk(
  "orders/loadArchived",
  async ({ index, status }, { getState }) => {
    const token = getState().client.token;
    const order = getState().orders[status][index];
    try {
      const response = await call(getOrderItemsRequest(token, order.id));
      return {
        items: response.data.items,
        index,
        status,
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

export const rateOrder = createAsyncThunk(
  "orders/loadArchived",
  async ({ index, rating }, { getState }) => {
    const token = getState().client.token;
    const order = getState().orders.archived[index];
    try {
      const response = await call(rateOrderRequest(token, order.id, rating));
      return {
        order: response.data.order,
        index,
        rating,
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

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetRequestStatus: {
      reducer(state, action) {
        state.status = "idle";
        state.error = null;
      },
    },
    setCached: {
      reducer(state, action) {
        switch (action.payload.type) {
          case "waiting":
            state.waitingCached = action.payload.cached;
            break;
          case "picking":
            state.pickingCached = action.payload.cached;
            break;
          case "serving":
            state.servingCached = action.payload.cached;
            break;
          case "delivering":
            state.delivering = action.payload.cached;
            break;
          case "archived":
            state.archivedCached = action.payload.cached;
            break;
          default:
            break;
        }
      },
      prepare(cached, type) {
        return {
          payload: {
            cached,
            type,
          },
        };
      },
    },
  },
  extraReducers: {
    [placeOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [placeOrder.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.waiting.push(action.payload.order);
      } else {
        state.error = action.payload.error;
      }
      state.loading = false;
    },
    [placeOrder.rejected]: (state, action) => {
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

export default ordersSlice.reducer;
export const { resetRequestStatus, setCached } = ordersSlice.actions;
