import * as Yup from "yup"
import { FieldMetaProps, FormikConfig, FormikProps } from "formik"
import { ReactNode } from "react"
import {
  TextFieldProps as MUITextFieldProps,
  SelectProps as MUISelectProps,
  AutocompleteProps as MUIAutocompleteProps,
  ChipTypeMap,
} from "@mui/material"

export type FormProps<T> = {
  initialValues: T
  validationSchema?: Yup.ObjectSchema<any>
  onSubmit: FormikConfig<T>["onSubmit"]
  children: ReactNode | ((context: FormikProps<T>) => ReactNode)
  loading?: boolean
  formikRef?: React.Ref<FormikProps<T>>
  classNames?: {
    wrapper?: string
    form?: string
  }
}

export interface FieldWrapperProps extends Omit<BaseInputProps, "placeholder"> {
  children: ReactNode
  meta?: FieldMetaProps<any>
  wordCount?: number
}
export interface BaseInputProps {
  label: string
  name: string
  classNames?: {
    wrapper?: string
    input?: string
    label?: string
    error?: string
    counter?: string
  }
  placeholder?: string
  max?: number
  readonly?: boolean
  disabled?: boolean
  notFormik?: boolean
  value?: any
}
// export interface InputProps extends BaseInputProps {
//   type?: string;
// }

export type TextFieldProps = MUITextFieldProps & {
  name: string
  maxChar?: number
}

export interface AutocompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
> extends MUIAutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  > {
  name: string
}

export type SelectProps = MUISelectProps & {
  name: string
}

export interface FileInputPreviewProps {
  images: {
    url: string
    alt: string
  }[]
  onRemove?: (index: number) => void
  disabled?: boolean
  className?: string
}
