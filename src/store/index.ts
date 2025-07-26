import { mainApi } from "@/api"
import experiencesReducer from "@/app/experiences/experiences.slice"
import globalReducer from "@/app/global.slice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    global: globalReducer,
    experiences: experiencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
