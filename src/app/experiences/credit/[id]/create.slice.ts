import { create_exp_form_initial_values } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const createExpSlice = createSlice({
  name: "createExp",
  initialState: {
    form: create_exp_form_initial_values,
  },
  reducers: {
    setFormValues: (
      state,
      action: PayloadAction<typeof create_exp_form_initial_values>
    ) => {
      state.form = action.payload;
    },
    resetForm: (state) => {
      state.form = create_exp_form_initial_values;
    },
  },
});

export const { setFormValues, resetForm } = createExpSlice.actions;

export default createExpSlice.reducer;
