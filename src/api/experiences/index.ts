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
import { mainApi } from "../index"
import { experienceListTranformer } from "../transformers/experiences"
import { api_tags } from "@/constants/api"

export const experiencesApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getExperienceCreationData: build.query<
      Response<ExperienceCreationData>,
      void
    >({
      query: () => `admin/experiences/creation/data`,
      providesTags: [api_tags.categories, api_tags.directors, api_tags.venues],
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
      invalidatesTags: [api_tags.experiences],
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
      providesTags: [api_tags.experiences],
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
      invalidatesTags: [api_tags.experiences],
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
} = experiencesApi
