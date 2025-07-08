import { RootState } from "@/store";
import {
  CreateExperienceBody,
  Response,
  UseGetExperienceCreationDataQueryResponse,
} from "@/types/api";
import type { Action, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: `${baseUrl}/api`,
    baseUrl: "/api/", // Proxy in next.config
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "sag",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMUpTVktOTkFYRFpOWjVOQkRUU0FaS1dQTSIsImNsaWVudCI6IndlYiIsImlhdCI6MTc1MTM3MzQwNn0.kiZlQquB_7bzZLOjem2B41xafF_h_6SUPqRuG5azBnQ",
    },
  }),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getExperienceCreationData: build.query<
      Response<UseGetExperienceCreationDataQueryResponse>,
      void
    >({
      query: () => `admin/experiences/creation/data`,
    }),
    createExperience: build.mutation<any, CreateExperienceBody>({
      query: (body) => ({
        url: "admin/experiences",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetExperienceCreationDataQuery,
  useCreateExperienceMutation,
} = mainApi;
