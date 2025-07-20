import {
  CheckboxProps,
  FormControlLabel,
  Checkbox as MUICheckbox,
} from "@mui/material"
import { useField } from "formik"

export default function Checkbox({
  name,
  label,
  className,
  classNames,
  ...props
}: CheckboxProps & {
  name: string
  label?: string
  classNames?: { input?: string; wrapper?: string }
}) {
  const [field] = useField(name)
  //   const showError = Boolean(meta.touched && meta.error)
  return (
    <FormControlLabel
      label={label}
      className={classNames?.wrapper}
      control={
        <MUICheckbox
          {...props}
          {...field}
          name={name}
          className={`${className} ${classNames?.input}`}
          checked={field.value}
        />
      }
    />
  )
}
