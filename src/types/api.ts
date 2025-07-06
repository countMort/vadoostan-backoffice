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
