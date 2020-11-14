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
  getArchivedRequest,
} from "../api/ordersRequestCreator";

const initialState = {
  waiting: [],
  picking: [],
  serving: [],
  delivering: [],
  archived: [],
  archivedPage: 0,
  status: "idle",
  ordering: "idle",
  error: null,
  waitingCached: false,
  pickingCached: false,
  servingCached: false,
  deliveringCached: false,
  archivedCached: false,
};

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (data, { getState }) => {
    const token = getState().client.token;
    const address = getState().client.addresses[data.address_index];
    try {
      const response = await call(
        placeOrderRequest(
          token,
          address.id,
          data.promo,
          data.wallet,
          data.time_slot.id,
          data.hasWeddingDress
        )
      );
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
  "orders/cancelOrder",
  async ({ index }, { getState }) => {
    const token = getState().client.token;
    try {
      const response = await call(
        cancelPickupRequest(token, getState().orders.waiting[index].id)
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
      const response = await call(
        getArchivedRequest(token, data.page, data.perPage)
      );
      return {
        orders: response.data,
        page: data.page,
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
  "orders/loadOrderItems",
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
  "orders/rateOrder",
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
    resetRequestStatusOrders: {
      reducer(state, action) {
        state.status = "idle";
        state.ordering = "idle";
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
            state.deliveringCached = action.payload.cached;
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
    emptyArchived: {
      reducer(state, action) {
        let archived = [];
        state.archived.forEach((o, i) => {
          if (i >= 5) return;
          archived.push(o);
        });
        state.archived = archived;
        state.archivedPage = 0;
      },
    },
  },
  extraReducers: {
    [placeOrder.pending]: (state, action) => {
      state.ordering = "ordering";
      state.status = "loading";
    },
    [placeOrder.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "succeeded";
        state.ordering = "placed";
        state.waiting.push(action.payload.order);
      } else {
        state.status = "failed";
        state.ordering = "failed";
        state.error = action.payload.error;
      }
    },
    [placeOrder.rejected]: (state, action) => {
      state.status = "failed";
      state.ordering = "failed";
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
        state.waitingCached = true;
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
        state.pickingCached = true;
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
        for (let i = 0; i < state.serving.length; i++) {
          state.serving[i].items = [];
        }
        state.servingCached = true;
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
        for (let i = 0; i < state.delivering.length; i++) {
          state.delivering[i].items = [];
        }
        state.deliveringCached = true;
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
        let orders = action.payload.orders;
        for (let i = 0; i < orders.length; i++) {
          orders[i].items = [];
        }
        orders.forEach((o) => {
          state.archived.push(o);
        });
        state.archivedPage = action.payload.page;
        state.archivedCached = true;
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
export const {
  resetRequestStatusOrders,
  setCached,
  emptyArchived,
} = ordersSlice.actions;
