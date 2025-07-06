import { AutocompleteProps } from "@/types/form"
import { Autocomplete as MUIAutocomplete } from "@mui/material"
import { useField } from "formik"

export default function AutoComplete<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = "div"
>({
  name,
  ...props
}: AutocompleteProps<
  Value,
  Multiple,
  DisableClearable,
  FreeSolo,
  ChipComponent
>) {
  const [field, meta, helpers] = useField(name)

  const showError = Boolean(meta.touched && meta.error)

  return (
    <MUIAutocomplete
      {...props}
      value={field.value}
      onChange={(_, value) => {
        helpers.setValue(value)
      }}
      onBlur={field.onBlur}
      renderInput={(params) =>
        props.renderInput?.({
          ...params,
          error: showError,
          helperText: showError ? meta.error : "",
        })
      }
    />
  )
}
