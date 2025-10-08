export type Response<T> = {
  isSuccessful: boolean
  message: string
  result: T
  traceId: number
}

export interface ExperienceCreationData {
  assistants: { userId: string; name: string }[]
  categories: { id: number; title: string }[]
  cities: { id: number; title: string }[]
  directors: [
    {
      bio: string
      name: string
      photoUrl: string
      userId: string
    }
  ]
  templates: []
  venues: {
    address: string
    id: string
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
  cityId: number
  sessions: {
    time: string
    publishTime: string
    description: string
    duration: number
    venueId: string
    price: number
    capacity: number
    groupLink: string
    allowedGender: string
    directorsUserId: string[]
    assistantsUserId: string[]
  }[]
}

export type UpdateExperienceBody = Omit<CreateExperienceBody, "creatorUserId">

export interface CreateExperienceResponse {
  expId: string
}

export interface GetExperiencesArgs {
  status: ExperiencesListStatus
}

export enum ExperienceStatus {
  PUBLISHED = "published",
  INACTIVE = "inactive",
  READY_TO_PUBLISH = "ready_to_publish",
  CANCELLED = "canceled",
  RUNNING = "running",
}

export enum ExperiencesListStatus {
  INACTIVE = "inactive",
  ACTIVE = "active",
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
  }[]
  cityId: number
  title: string
  category: string
  description: string
  isSeries: boolean
}

export interface UpdateExperienceArgs {
  expId: string
  exp: UpdateExperienceBody
}

// Venue-related types
export interface CreateVenueBody {
  title: string
  fullAddress: string
  location: {
    latitude: number
    longitude: number
  }
  cityId: number
  neighborhood: string
}

export interface CreateVenueResponse {
  id: string
  title: string
  fullAddress: string
  location: {
    latitude: number
    longitude: number
  }
  cityId: number
  neighborhood: string
}

export interface UpdateVenueBody {
  title: string
  fullAddress: string
  location: {
    latitude: number
    longitude: number
  }
  cityId: number
  neighborhood: string
}

export interface UpdateVenueArgs {
  venueId: string
  venue: UpdateVenueBody
}

// Venues list response
export type VenuesListResponse = VenueResponse[]

// Single venue response
export interface VenueResponse {
  id: string
  title: string
  address: {
    neighborhood: string
    exact: string
  }
  location: {
    latitude: number
    longitude: number
  }
  cityId: number
}

export interface GetExperienceRegistrationsArgs {
  expId: string
}

export interface Attendee {
  name: string
  regStatus: string
  mobileNumber: string
  telegramUsername: string | null
}
export interface GetExperienceRegistrationsResponse {
  remainingCapacity: number
  attendees: Attendee[]
}

// Director-related types
export interface CreateDirectorBody {
  firstName: string
  lastName: string
  mobileNumber: string
  jobTitle: string
  bio: string
  photo: string // base64 encoded string
}

export interface CreateDirectorResponse {
  userId: string
  firstName: string
  lastName: string
  mobileNumber: string
  jobTitle: string
  bio: string
  photo: string
}

export interface UpdateDirectorBody {
  firstName: string
  lastName: string
  mobileNumber: string
  jobTitle: string
  bio: string
  photo: string // base64 encoded string
}

export interface UpdateDirectorArgs {
  directorId: string
  director: UpdateDirectorBody
}

// Directors list response
export interface DirectorsListResponse {
  count: number
  directors: DirectorResponse[]
}

// Single director response
export interface DirectorResponse {
  userId: string
  name: string
  bio: string
  jobTitle: string
  photoUrl: string
}

// Category-related types
export interface CreateCategoryBody {
  faTitle: string
  enTitle: string
}

// Authentication-related types
export interface LoginRequest {
  username: string
  password: string
  client: "web"
}

export interface LoginResponse {
  token: string
  refreshToken: string
}

export interface AuthState {
  token: string | null
  refreshToken: string | null
  // user: {
  //   id: string
  //   username: string
  //   email: string
  //   role: string
  // } | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitializing: boolean
}
