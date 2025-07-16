export enum ExperiencePageStatus {
  INACTIVE = "inactive",
  ACTIVE = "active",
}

export const experiences_route = "/experiences"
export const experiences_active_route = `/experiences?status=${ExperiencePageStatus.ACTIVE}`
export const experiences_past_route = `/experiences?status=${ExperiencePageStatus.INACTIVE}`
export const experience_create_route = "/experiences/credit/0"
export const experience_edit_route = (id: string) => "/experiences/credit/" + id
export const experience_credit_confirm_route = (id: string) =>
  `/experiences/credit/${id}/confirm`
