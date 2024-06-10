import { configureStore } from "@reduxjs/toolkit";
import reducer from "./createslice";
const store = configureStore({
  reducer: {
    cart: reducer,
  },
});
export default store;
