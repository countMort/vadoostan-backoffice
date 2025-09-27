import { CreateCategoryBody, Response } from "@/types/api"
import { mainApi } from "../index"
import { api_tags } from "@/constants/api-tags"

export const categoriesApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation<Response<void>, CreateCategoryBody>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: [api_tags.categories],
    }),
  }),
})

export const { useCreateCategoryMutation } = categoriesApi
