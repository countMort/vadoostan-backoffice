export const login_route = "/auth/login"
export const experiences_route = "/experiences"
export const experience_edit_route = (id: string) => "/experiences/credit/" + id
export const createExpId = "create"
export const experience_create_route = experience_edit_route(createExpId)
export const experience_edit_confirm_route = (id: string) =>
  `/experiences/credit/${id}/confirm`
export const experience_create_confirm_route =
  experience_edit_confirm_route(createExpId)
export const experience_actions_route = "/experiences/actions"
export const experience_actions_venues_route = "/experiences/actions/venues"
export const create_venue_id = "create"
export const experience_actions_edit_venue_route = (id: string) =>
  `/experiences/actions/venues/credit/${id}`
export const experience_actions_create_venue_route =
  experience_actions_edit_venue_route(create_venue_id)
export const experience_actions_directors_route =
  "/experiences/actions/directors"
export const create_director_id = "create"
export const experience_actions_edit_director_route = (id: string) =>
  `/experiences/actions/directors/credit/${id}`
export const experience_actions_create_director_route =
  experience_actions_edit_director_route(create_director_id)

export const create_category_id = "create"
export const experience_actions_edit_category_route = (id: string) =>
  `/experiences/actions/categories/credit/${id}`
export const experience_actions_create_category_route =
  experience_actions_edit_category_route(create_category_id)
