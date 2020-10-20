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
  async ({ index }, { getState }) => {
    const token = getState().client.token;
    try {
      const response = await call(
        cancelPickupRequest(token, getState().orders.picking[index].id)
      );
      return {
        success: true,
        index,
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
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [placeOrder.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [cancelOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [cancelOrder.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.waiting.splice(action.payload.index, 1);
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [cancelOrder.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [loadWaiting.pending]: (state, action) => {
      state.status = "loading";
    },
    [loadWaiting.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.waiting = action.payload.orders;
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [loadWaiting.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [loadPicking.pending]: (state, action) => {
      state.status = "loading";
    },
    [loadPicking.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.picking = action.payload.orders;
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [loadPicking.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [loadServing.pending]: (state, action) => {
      state.status = "loading";
    },
    [loadServing.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.serving = action.payload.orders;
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [loadServing.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [loadDelivering.pending]: (state, action) => {
      state.status = "loading";
    },
    [loadDelivering.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.delivering = action.payload.orders;
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [loadDelivering.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [loadArchived.pending]: (state, action) => {
      state.status = "loading";
    },
    [loadArchived.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.archived = action.payload.orders;
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [loadArchived.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [loadOrderItems.pending]: (state, action) => {
      state.status = "loading";
    },
    [loadOrderItems.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state[action.payload.status][action.payload.index].items =
          action.payload.items;
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [loadOrderItems.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [rateOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [rateOrder.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.archived[action.payload.index].rating = action.payload.rating;
      } else {
        state.status = "failed";
        state.error = action.payload.error;
      }
    },
    [rateOrder.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default ordersSlice.reducer;
export const { resetRequestStatus, setCached } = ordersSlice.actions;
