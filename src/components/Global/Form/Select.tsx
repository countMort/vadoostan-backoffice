import { SelectProps } from "@/types/form";
import { Select as MUISelect } from "@mui/material";
import { useField } from "formik";

export default function Select({ name, ...props }: SelectProps) {
  const [field, meta] = useField(name);

  const showError = Boolean(meta.touched && meta.error);

  return (
    <>
      <MUISelect
        {...field}
        {...props}
        error={showError}
        fullWidth
      />
    </>
  );
}
