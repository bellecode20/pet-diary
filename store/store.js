import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modalSlice";
import imgToDataUrlReducer from "./features/imgToDataUrlSlice";
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    imgToDataUrl: imgToDataUrlReducer,
  },
});
