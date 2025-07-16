import {
  customDate,
  dateToPersianDate,
} from "@/components/Global/Form/DatePicker";
import { GetExperiencesResponse } from "@/types/api";

export const experienceListTranformer = (
  exps: GetExperiencesResponse["exps"]
) => {
  return exps.map((exp) => {
    const newDate = dateToPersianDate(customDate(exp.date, { locale: "en" }));
    return {
      ...exp,
      date: newDate.format("DD MMMM YYYY"),
      time: newDate.format("HH:mm"),
    };
  });
};
