export enum ExperiencePageStatus {
  PAST = "PAST",
  ACTIVE = "ACTIVE",
}

export const experiences_route = "/experiences";
export const experiences_active_route = `/experiences?status=${ExperiencePageStatus.ACTIVE}`;
export const experiences_past_route = `/experiences?status=${ExperiencePageStatus.PAST}`;
export const experience_create_route = "/experiences/create";
export const experience_create_confirm_route = "/experiences/create/confirm";
