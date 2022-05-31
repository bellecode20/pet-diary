import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShown: false,
  category: "SuccessModal",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalIsShown: (state, action) => {
      state.isShown = action.payload;
    },
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});
export const { modalIsShown, changeCategory } = modalSlice.actions;
export default modalSlice.reducer;
