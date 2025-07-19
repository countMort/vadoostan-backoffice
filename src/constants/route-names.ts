export enum ExperiencePageStatus {
  INACTIVE = "inactive",
  ACTIVE = "active",
}

export const experiences_route = "/experiences"
export const experiences_active_route = `/experiences?status=${ExperiencePageStatus.ACTIVE}`
export const experiences_past_route = `/experiences?status=${ExperiencePageStatus.INACTIVE}`
export const experience_edit_route = (id: string) => "/experiences/credit/" + id
export const createExpId = "create"
export const experience_create_route = experience_edit_route(createExpId)
export const experience_edit_confirm_route = (id: string) =>
  `/experiences/credit/${id}/confirm`
export const experience_create_confirm_route =
  experience_edit_confirm_route(createExpId)
