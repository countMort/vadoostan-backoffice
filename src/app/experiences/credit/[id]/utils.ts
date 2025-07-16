import {
  customDate,
  dateToPersianDate,
} from "@/components/Global/Form/DatePicker"
import { create_exp_form_initial_values } from "@/constants"
import { BEExperience, ExperienceCreationData } from "@/types/api"
let files: File[] = []

export function setFiles(newFiles: File[]) {
  files = newFiles
}

export function getFiles() {
  return files
}

export function resetFiles() {
  files = []
}

export const transformDataToForm = (
  exp: BEExperience,
  data: ExperienceCreationData
): typeof create_exp_form_initial_values => {
  return {
    ...exp,
    images: [] as File[],
    category: {
      ...data.categories.find((cat) => cat.title === exp.category)!,
    },
    faqs: exp.faqs,
    sessions: exp.sessions.map((session) => {
      const publishTime = dateToPersianDate(
        customDate(exp.sessions[0].publishTime, {
          locale: "en",
        })
      )
      return {
        ...session,
        director: data.directors.find(
          (director) => director.name === session.directors[0].name
        )!,
        venue: data.venues.find((venue) => venue.title === session.venueName)!,
        publishTime: {
          date: publishTime.format("YYYY/MM/DD"),
          time: publishTime.format("HH:mm"),
        },
      }
    }),
  }
}
