import { Attendee, ExperienceStatus } from "../api"

export interface ExperienceCardProps {
  title?: string
  category?: string
  neighbourhood: string
  time: string
  date: string
  onClick?: () => void
  capacity: number
  registrations: number
  status: ExperienceStatus
}

export interface RegistrationsListProps {
  attendees: Attendee[]
  className?: string
}
