import { RootState } from "@/store"
import {
  AddExperiencePhotosArgs,
  BEExperience,
  CreateExperienceBody,
  CreateExperienceResponse,
  GetExperienceArgs,
  GetExperiencesArgs,
  GetExperiencesResponse,
  Response,
  ExperienceCreationData,
  UpdateExperienceArgs,
  GetExperienceRegistrationsArgs,
  GetExperienceRegistrationsResponse,
} from "@/types/api"
import type { Action, PayloadAction } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"
import { experienceListTranformer } from "./transformers/experiences"
function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: `${baseUrl}/api`,
    baseUrl: "/api/", // Proxy in next.config
    prepareHeaders(headers, { endpoint }) {
      if (endpoint !== "addExperiencePhotos")
        headers.set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMUpTVktOTkFYRFpOWjVOQkRUU0FaS1dQTSIsImNsaWVudCI6IndlYiIsImlhdCI6MTc1MTM3MzQwNn0.kiZlQquB_7bzZLOjem2B41xafF_h_6SUPqRuG5azBnQ"
        )
      return headers
    },
  }),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (build) => ({
    getExperienceCreationData: build.query<
      Response<ExperienceCreationData>,
      void
    >({
      query: () => `admin/experiences/creation/data`,
    }),
    createExperience: build.mutation<
      Response<CreateExperienceResponse>,
      CreateExperienceBody
    >({
      query: (body) => ({
        url: "admin/experiences",
        method: "POST",
        body,
      }),
    }),
    getExperiences: build.query({
      query: ({ status }: GetExperiencesArgs) => ({
        url: "/admin/experiences",
        params: { status },
      }),
      transformResponse: (
        baseQueryReturnValue: Response<GetExperiencesResponse>
      ) => {
        return experienceListTranformer(baseQueryReturnValue.result.exps)
      },
    }),
    addExperiencePhotos: build.mutation<any, AddExperiencePhotosArgs>({
      query: ({ expId, formData }) => ({
        url: `/admin/experiences/${expId}/photos`,
        body: formData,
        method: "POST",
      }),
    }),
    getExperience: build.query<Response<BEExperience>, GetExperienceArgs>({
      query: ({ expId }) => ({
        url: `/admin/experiences/${expId}`,
      }),
    }),
    updateExperience: build.mutation<Response<any>, UpdateExperienceArgs>({
      query: ({ expId, exp }) => ({
        url: `/admin/experiences/${expId}`,
        body: exp,
        method: "PATCH",
      }),
    }),
    getExperienceRegistrations: build.query<
      Response<GetExperienceRegistrationsResponse>,
      GetExperienceRegistrationsArgs
    >({
      query: ({ expId }) => ({
        url: `/admin/experiences/${expId}/registrations`,
      }),
    }),
  }),
})

export const {
  useGetExperienceCreationDataQuery,
  useCreateExperienceMutation,
  useGetExperiencesQuery,
  useAddExperiencePhotosMutation,
  useGetExperienceQuery,
  useUpdateExperienceMutation,
  useGetExperienceRegistrationsQuery,
} = mainApi
