import { mainApi } from "@/api"
import { LoginRequest, LoginResponse, Response } from "@/types/api"

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Response<LoginResponse>, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/bo/login",
        method: "POST",
        body: credentials,
      }),
    }),
    // Not working
    logout: builder.mutation<Response<null>, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    // Not working
    refreshToken: builder.mutation<
      Response<{ token: string }>,
      { refreshToken: string }
    >({
      query: (body) => ({
        url: "auth/refresh",
        method: "POST",
        body,
      }),
    }),
    getCurrentUser: builder.query<Response<any>, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
} = authApi
