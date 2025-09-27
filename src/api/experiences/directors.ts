import {
  CreateDirectorBody,
  CreateDirectorResponse,
  UpdateDirectorArgs,
  Response,
} from "@/types/api"
import { mainApi } from "../index"
import { api_tags } from "@/constants/api-tags"

export const directorsApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
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

export const { useCreateDirectorMutation, useUpdateDirectorMutation } =
  directorsApi
