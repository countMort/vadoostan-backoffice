export type Response<T> = {
  isSuccessful: boolean;
  message: string;
  result: T;
  traceId: number;
};

export interface UseGetExperienceCreationDataQueryResponse {
  assistants: { userId: string; name: string }[];
  categories: { id: number; title: string }[];
  directors: [
    {
      bio: string;
      name: string;
      photoUrl: string;
      userId: string;
    }
  ];
  inclusions: { id: number; title: string }[];
  templates: [];
  venues: {
    address: string;
    id: number;
    location: { latitude: number; longitude: number };
    title: string;
  }[];
}

export interface CreateExperienceBody {
  title: string;
  description: string;
  categoryId: number;
  faqs: {
    question: string;
    answer: string;
  }[];
  isSeries: boolean;
  creatorUserId: string;
  sessions: {
    time: string;
    publishTime: string;
    description: string;
    duration: number;
    venueId: number;
    price: number;
    capacity: number;
    groupLink: string;
    allowedGender: string;
    directorsUserId: string[];
    assistantsUserId: string[];
  }[];
}

export interface GetExperiencesArgs {
  status: ExperienceStatus;
}

export enum ExperienceStatus {
  PUBLISHED = "published",
  INACTIVE = "inactive",
  READY_TO_PUBLISH = "ready_to_publish",
}
