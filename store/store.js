import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modalSlice";
import imgToDataUrlReducer from "./features/imgToDataUrlSlice";
import loadDbReducer from "./features/loadDbSlice";
import { createWrapper } from "next-redux-wrapper";
const makeStore = () =>
  configureStore({
    reducer: {
      modal: modalReducer,
      imgToDataUrl: imgToDataUrlReducer,
      loadDb: loadDbReducer,
    },
    devTools: true,
  });

// export const store = configureStore({
//   reducer: {
//     modal: modalReducer,
//     imgToDataUrl: imgToDataUrlReducer,
//   },
// });

export const wrapper = createWrapper(makeStore);
