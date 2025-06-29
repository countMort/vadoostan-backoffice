import { TextInputProps, FormTextInputProps } from "@/types/form";
import { useFormContext } from "react-hook-form";

export const TextInput = ({
  label,
  name,
  register,
  error,
  helperText,
  type = "text",
  placeholder,
  className,
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register?.(name)}
        className={`
          w-full px-3 py-2 rounded-md border
          focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? "border-red-500" : "border-gray-300"}
          ${className || ""}
        `}
      />
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="text-sm text-red-500">{error.message as string}</p>
      )}
    </div>
  );
};

const FormTextInput = (props: FormTextInputProps) => {
  const form = useFormContext();
  if (!form) throw new Error("FormField must be used within a Form");

  return (
    <TextInput
      {...props}
      register={form.register}
      error={form.formState.errors[props.name]}
    />
  );
};

export default FormTextInput;
