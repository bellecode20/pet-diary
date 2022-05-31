import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modalSlice";
import imgToDataUrlReducer from "./features/imgToDataUrlSlice";
import userSliceReducer from "./features/userSlice";
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    imgToDataUrl: imgToDataUrlReducer,
    user: userSliceReducer,
  },
});
