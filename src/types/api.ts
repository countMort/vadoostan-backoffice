import { ExperiencePageStatus } from "@/constants/route-names"

export type Response<T> = {
  isSuccessful: boolean
  message: string
  result: T
  traceId: number
}

export interface ExperienceCreationData {
  assistants: { userId: string; name: string }[]
  categories: { id: number; title: string }[]
  directors: [
    {
      bio: string
      name: string
      photoUrl: string
      userId: string
    }
  ]
  inclusions: { id: number; title: string }[]
  templates: []
  venues: {
    address: string
    id: number
    location: { latitude: number; longitude: number }
    title: string
  }[]
}

export interface CreateExperienceBody {
  title: string
  description: string
  categoryId: number
  faqs: {
    question: string
    answer: string
  }[]
  isSeries: boolean
  creatorUserId: string
  sessions: {
    time: string
    publishTime: string
    description: string
    duration: number
    venueId: number
    price: number
    capacity: number
    groupLink: string
    allowedGender: string
    directorsUserId: string[]
    assistantsUserId: string[]
  }[]
}

export interface CreateExperienceResponse {
  expId: string
}

export interface GetExperiencesArgs {
  status: ExperiencePageStatus
}

export enum ExperienceStatus {
  PUBLISHED = "published",
  INACTIVE = "inactive",
  READY_TO_PUBLISH = "ready_to_publish",
  CANCELLED = "cancelled",
}

export interface AddExperiencePhotosArgs {
  expId: string
  formData: FormData
}

export interface GetExperiencesResponse {
  count: number
  exps: {
    address: string
    category: string
    date: string
    id: string
    isFilled: boolean
    price: number
    status: ExperienceStatus
    title: string
    registrations: number
    capacity: number
  }[]
}
export interface GetExperienceArgs {
  expId: string
}
export interface BEExperience {
  expPhotos: []
  faqs: {
    question: string
    answer: string
    id: number
  }[]
  sessions: {
    id: string
    time: string
    publishTime: string
    description: string
    price: number
    groupLink: string
    capacity: number
    duration: number
    venueName: string
    allowedGender: "men" | "women" | "all"
    directors: {
      userId: string
      name: string
    }[]
    assistants: []
    inclusions: []
  }[]
  title: string
  category: string
  description: string
  isSeries: boolean
}

export interface UpdateExperienceArgs {
  expId: string
  exp: CreateExperienceBody
}
