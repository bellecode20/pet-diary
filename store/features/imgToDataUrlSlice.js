import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  imageFile: null,
  dataUrl: null,
};
export const imgToDataUrlSlice = createSlice({
  name: "imgToDataUrl",
  initialState,
  reducers: {
    setImageFiles: (state, action) => {
      state.imageFile = action.payload;
    },
    setDataUrls: (state, action) => {
      state.dataUrl = action.payload;
    },
    addDataUrlToArray: (state, action) => {
      state.dataUrl = [...state.dataUrl, action.payload];
    },
  },
});
export const { setImageFiles, setDataUrls, addDataUrlToArray } =
  imgToDataUrlSlice.actions;
export default imgToDataUrlSlice.reducer;
