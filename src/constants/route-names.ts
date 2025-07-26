export const experiences_route = "/experiences"
export const experience_edit_route = (id: string) => "/experiences/credit/" + id
export const createExpId = "create"
export const experience_create_route = experience_edit_route(createExpId)
export const experience_edit_confirm_route = (id: string) =>
  `/experiences/credit/${id}/confirm`
export const experience_create_confirm_route =
  experience_edit_confirm_route(createExpId)
