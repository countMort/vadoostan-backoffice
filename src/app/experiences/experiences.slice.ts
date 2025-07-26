import { combineReducers, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createExpSlice } from "./credit/[id]/create.slice"
import { ExperiencesListStatus } from "@/types/api"

export const experiencesInitialState = {
  status: ExperiencesListStatus.ACTIVE,
}
export const experiencesSlice = createSlice({
  name: "experiences",
  initialState: experiencesInitialState,
  reducers: {
    setStatus: (
      state,
      action: PayloadAction<typeof experiencesInitialState.status>
    ) => {
      state.status = action.payload
    },
  },
})

export const { setStatus } = experiencesSlice.actions

export default combineReducers({
  credit: createExpSlice.reducer,
  base: experiencesSlice.reducer,
})
