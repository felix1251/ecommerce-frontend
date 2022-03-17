import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    data: []
  },
  reducers: {
    getProductReview: (state, action) => {
      state.data = action.payload;
    },
    addReview: (state, action) => {
      state.data.unshift(action.payload)
    }
  },
});

export const { getProductReview, addReview } = reviewSlice.actions;
export default reviewSlice.reducer;
