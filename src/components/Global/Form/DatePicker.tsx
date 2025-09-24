import ReactDatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import FieldWrapper from "./Partials/FieldWrapper"
import { useField } from "formik"
import { BaseInputProps } from "@/types/form"
import TimePicker from "react-multi-date-picker/plugins/time_picker"
import { DateObject } from "react-multi-date-picker"
import { be_time_format, time_format } from "@/constants/experiences"
import gregorian from "react-date-object/calendars/gregorian"
import gregorian_en from "react-date-object/locales/gregorian_en"
import { Locale } from "react-date-object"

const DatePicker = ({
  name,
  classNames,
  placeholder,
  ...rest
}: BaseInputProps) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  return (
    <FieldWrapper {...rest} name={name} classNames={classNames} meta={meta}>
      <ReactDatePicker
        containerStyle={{ display: "block" }}
        calendar={persian}
        locale={persian_fa}
        value={field.value}
        onChange={(val) => {
          helpers.setValue(val?.format(time_format))
        }}
        inputClass={`w-full px-3 py-2 border border-gray-300 rounded shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            classNames?.input
          } ${showError ? "border-red-500" : ""}`}
        placeholder={placeholder}
        format={time_format}
        plugins={[
          <TimePicker
            className="text-black"
            key="timepicker"
            position="bottom"
          />,
        ]}
      />
    </FieldWrapper>
  )
}

export default DatePicker
const localeNames = ["fa", "en"] as const
export const customDate = (
  date: string,
  options:
    | {
        locale: (typeof localeNames)[number]
        format?: string
      }
    | {
        format: string
        locale: Locale
        calendar: typeof persian
      }
) => {
  if (localeNames.includes(options.locale as (typeof localeNames)[number])) {
    let calendar: typeof persian
    let format = options.format
    let locale: Locale
    if (options.locale === "fa") {
      calendar = persian
      locale = persian_fa
      format = format || time_format
    } else {
      calendar = gregorian
      locale = gregorian_en
      format = format || be_time_format
    }
    return new DateObject({ date, format, locale, calendar })
  } else {
    // @ts-expect-error nvm
    return new DateObject({ date, ...options })
  }
}

export const dateToPersianDate = (date: DateObject) =>
  date.convert(persian, persian_fa)
