import { CreateVenueBody, CreateVenueResponse, Response } from "@/types/api"
import { mainApi } from "../index"
import { api_tags } from "@/constants/api-tags"

export const venuesApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    createVenue: build.mutation<Response<CreateVenueResponse>, CreateVenueBody>(
      {
        query: (body) => ({
          url: "/venues",
          method: "POST",
          body,
        }),
        invalidatesTags: [api_tags.venues],
      }
    ),
  }),
})

export const { useCreateVenueMutation } = venuesApi
