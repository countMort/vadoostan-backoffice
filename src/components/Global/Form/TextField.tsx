import { TextFieldProps } from "@/types/form";
import { TextField as MUITextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useMemo } from "react";

export default function TextField({
  name,
  maxChar,
  className,
  ...props
}: TextFieldProps) {
  const [field, meta] = useField(name);
  const { values } = useFormikContext<Record<string, string>>();

  const showError = Boolean(meta.touched && meta.error);
  const wordCount = useMemo(() => {
    const val = values[name] || "";
    return val.length;
  }, [values, name]);
  return (
    <div className={className}>
      <MUITextField
        {...field}
        {...props}
        error={showError}
        helperText={showError ? meta.error : ""}
        fullWidth
      />
      {maxChar && maxChar > 0 && (
        <div className={`text-sm text-gray-500 text-end mt-1`}>
          {wordCount}/{maxChar}
        </div>
      )}
    </div>
  );
}
