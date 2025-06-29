import { ValueOf } from "next/dist/shared/lib/constants";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export type FormTextInputProps = Omit<TextInputProps, "register" | "error">;

export interface FormProps {
  onSubmit: (data: FieldValues) => void;
  defaultValues?: FieldValues;
  children?: React.ReactNode;
}

export interface TextInputProps {
  label?: string;
  name: string;
  register?: UseFormRegister<any>;
  error?: ValueOf<FieldErrors<FieldValues>>;
  helperText?: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

export interface TextareaProps {
  label?: string;
  name: string;
  register?: UseFormRegister<any>;
  error?: ValueOf<FieldErrors<FieldValues>>;
  helperText?: string;
  placeholder?: string;
  className?: string;
}
