import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./clientSlice";
import ordersReducer from "./ordersSlice";

export default configureStore({
  reducer: {
    client: clientReducer,
    orders: ordersReducer,
  },
});
