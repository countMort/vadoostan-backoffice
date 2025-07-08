import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

const globalState = {};

export const globalSlice = createSlice({
  name: "global",
  initialState: globalState,
  reducers: {},
});

export const {} = globalSlice.actions;

export default globalSlice.reducer;
