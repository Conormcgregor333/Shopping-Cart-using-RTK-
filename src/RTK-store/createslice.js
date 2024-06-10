import { createSlice } from "@reduxjs/toolkit";

let initialState = [];
export const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    RemoveFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});
export const { addToCart, RemoveFromCart } = slice.actions;
export default slice.reducer;
