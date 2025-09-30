import { RootState } from "@/store"
import type { Action, PayloadAction } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"
import { api_tags } from "@/constants/api-tags"
function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: `${baseUrl}/api`,
    baseUrl: "/api/", // Proxy in next.config
    prepareHeaders(headers, { getState }) {
      const state = getState() as RootState
      const token = state.auth.token

      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      } else {
        headers.set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMUpTVktOTkFYRFpOWjVOQkRUU0FaS1dQTSIsImNsaWVudCI6IndlYiIsImlhdCI6MTc1MTM3MzQwNn0.kiZlQquB_7bzZLOjem2B41xafF_h_6SUPqRuG5azBnQ"
        )
      }

      return headers
    },
  }),
  tagTypes: Object.values(api_tags),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  endpoints: () => ({
    // Experience-related endpoints have been moved to src/api/experiences/index.ts
  }),
})

// Experience-related hooks have been moved to src/api/experiences/index.ts
// Import them from there instead
