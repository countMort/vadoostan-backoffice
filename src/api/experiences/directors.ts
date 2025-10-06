import {
  CreateDirectorBody,
  CreateDirectorResponse,
  UpdateDirectorArgs,
  Response,
  DirectorsListResponse,
} from "@/types/api"
import { mainApi } from "../index"
import { api_tags } from "@/constants/api"

export const directorsApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getDirectors: build.query<Response<DirectorsListResponse>, void>({
      query: () => ({
        url: "/directors",
        method: "GET",
      }),
      providesTags: [api_tags.directors],
    }),
    createDirector: build.mutation<
      Response<CreateDirectorResponse>,
      CreateDirectorBody
    >({
      query: (body) => ({
        url: "/directors",
        method: "POST",
        body,
      }),
      invalidatesTags: [api_tags.directors],
    }),
    updateDirector: build.mutation<
      Response<CreateDirectorResponse>,
      UpdateDirectorArgs
    >({
      query: ({ directorId, director }) => ({
        url: `/directors/${directorId}`,
        method: "PATCH",
        body: director,
      }),
      invalidatesTags: [api_tags.directors],
    }),
  }),
})

export const { 
  useGetDirectorsQuery,
  useCreateDirectorMutation, 
  useUpdateDirectorMutation 
} = directorsApi
