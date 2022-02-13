import { createSlice } from "@reduxjs/toolkit";

const cartSLice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    deleteFromCart: (state, action) => {
      state.products = state.products.filter((product) => product.stateId !==  action.payload.stateId);
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
    },
    clearCart: (state) => {
      while (state.products.length) {
        state.products.pop();
      }
      state.quantity = 0;
      state.total = 0;
    }
  },
});
export const {addProduct ,deleteFromCart, clearCart} = cartSLice.actions
export default cartSLice.reducer;
