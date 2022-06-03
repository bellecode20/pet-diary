import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  commuLimit: 3,
  diaryLimit: 3,
};

export const loadDbSlice = createSlice({
  name: "loadDb",
  initialState,
  reducers: {
    changeCommuLimit: (state, action) => {
      state.commuLimit = action.payload;
    },
    changeDiaryLimit: (state, action) => {
      state.diaryLimit = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (
        !action.payload.loadDb.commuLimit ||
        !action.payload.loadDb.diaryLimit
      ) {
        return state;
      }
      state.commuLimit = action.payload.loadDb.commuLimit;
      state.diaryLimit = action.payload.loadDb.diaryLimit;
    },
  },
});
export const { changeCommuLimit, changeDiaryLimit } = loadDbSlice.actions;
export const selectLoadDb = (state) => state.loadDb;
export default loadDbSlice.reducer;
