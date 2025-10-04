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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJSMjdFblRRTWZKckQiLCJjbGllbnQiOiJ3ZWIiLCJpYXQiOjE3NTkxNDEwODN9.-o4IET3fWjME5jefLcrbWskKNUSLsau7844PbfpxuwM"
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
