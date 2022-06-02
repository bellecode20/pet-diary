import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShown: false,
  category: "SuccessModal",
  contentText: "",
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
    changeContentText: (state, action) => {
      state.contentText = action.payload;
    },
  },
});
export const { modalIsShown, changeCategory, changeContentText } =
  modalSlice.actions;
export default modalSlice.reducer;
