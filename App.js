import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import Index from "./screens/index";

export default function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}
