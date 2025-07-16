import { AutocompleteProps } from "@/types/form"
import { ChipTypeMap, Autocomplete as MUIAutocomplete } from "@mui/material"
import { useField } from "formik"

export default function Autocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
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
          // @ts-expect-error customization
          error: showError,
          helperText: showError ? meta.error : "",
        })
      }
    />
  )
}
