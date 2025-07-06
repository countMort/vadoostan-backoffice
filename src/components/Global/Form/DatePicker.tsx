import ReactDatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import FieldWrapper from "./Partials/FieldWrapper";
import { useFormikContext } from "formik";
import { BaseInputProps } from "@/types/form";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const DatePicker = ({
  name,
  classNames,
  placeholder,
  ...rest
}: BaseInputProps) => {
  const { setFieldValue, getFieldMeta, values } = useFormikContext();
  const meta = getFieldMeta(name);
  const showError = meta.touched && meta.error;

  return (
    <FieldWrapper {...rest} name={name} classNames={classNames} meta={meta}>
      <ReactDatePicker
        containerStyle={{ display: "block" }}
        calendar={persian}
        locale={persian_fa}
        value={(values as any)[name]}
        onChange={(val) => {
          setFieldValue(name, val?.format("DD/MM/YYYY HH:mm:ss"));
        }}
        inputClass={`w-full px-3 py-2 border border-gray-300 rounded shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            classNames?.input
          } ${showError ? "border-red-500" : ""}`}
        placeholder={placeholder}
        format="DD/MM/YYYY HH:mm:ss"
        plugins={[
          <TimePicker
            className="text-black"
            key="timepicker"
            position="bottom"
          />,
        ]}
      />
    </FieldWrapper>
  );
};

export default DatePicker;
