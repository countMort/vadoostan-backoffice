import { RootState } from "@/store"
import type { Action, PayloadAction } from "@reduxjs/toolkit"
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"
import { api_tags } from "@/constants/api"
import { logout } from "@/app/auth/auth.slice"
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query"
import { login_route } from "@/constants/route-names"

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

// Base query configuration
const baseQuery = fetchBaseQuery({
  // baseUrl: `${baseUrl}/api`,
  baseUrl: "/api/", // Proxy in next.config
  prepareHeaders(headers, { getState }) {
    const state = getState() as RootState
    const token = state.auth.token

    if (token) {
      headers.set("Authorization", token)
    }

    return headers
  },
})

// Wrapper to handle 401/403 responses
const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  // Check for 401 or 403 status codes
  if (result.error) {
    const status = result.error.status
    if (status === 401 || status === 403) {
      // Dispatch logout action
      api.dispatch(logout())

      // Redirect to login page (client-side)
      if (typeof window !== "undefined") {
        window.location.href = login_route
      }
    }
  }

  return result
}

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: baseQueryWithAuth,
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
