import { 
  CreateVenueBody, 
  CreateVenueResponse, 
  UpdateVenueArgs,
  VenuesListResponse,
  Response 
} from "@/types/api"
import { mainApi } from "../index"
import { api_tags } from "@/constants/api"

export const venuesApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getVenues: build.query<Response<VenuesListResponse>, void>({
      query: () => ({
        url: "/venues",
        method: "GET",
      }),
      providesTags: [api_tags.venues],
    }),
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
    updateVenue: build.mutation<
      Response<CreateVenueResponse>,
      UpdateVenueArgs
    >({
      query: ({ venueId, venue }) => ({
        url: `/venues/${venueId}`,
        method: "PATCH",
        body: venue,
      }),
      invalidatesTags: [api_tags.venues],
    }),
  }),
})

export const { 
  useGetVenuesQuery,
  useCreateVenueMutation,
  useUpdateVenueMutation 
} = venuesApi
