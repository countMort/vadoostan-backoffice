import { BaseInputProps } from "@/types/form";
import { useField, useFormikContext } from "formik";
import { NumericFormat } from "react-number-format";
import FieldWrapper from "./Partials/FieldWrapper";

export const NumberInput = ({
  name,
  classNames,
  placeholder,
  readonly,
  ...rest
}: BaseInputProps) => {
  const {} = useField(name);
  const { setFieldValue, values, getFieldMeta } = useFormikContext();
  const meta = getFieldMeta(name);
  const showError = meta.touched && meta.error;
  return (
    <FieldWrapper name={name} classNames={classNames} meta={meta} {...rest}>
      <NumericFormat
        id={name}
        className={`w-full px-3 py-2 border border-gray-300 rounded shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            classNames?.input
          } ${showError ? "border-red-500" : ""}`}
        placeholder={placeholder}
        thousandSeparator
        name={name}
        value={(values as any)[name]}
        onValueChange={({ value }) => setFieldValue(name, value)}
        readOnly={readonly}
      />
    </FieldWrapper>
  );
};
