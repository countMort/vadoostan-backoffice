import { FieldWrapperProps } from "@/types/form";

const FieldWrapper = ({
  name,
  classNames,
  label,
  max,
  children,
  meta,
  wordCount,
}: FieldWrapperProps) => {
  const showError = meta?.touched && meta.error;
  return (
    <div className={classNames?.wrapper}>
      <label
        htmlFor={name}
        className={`block font-medium mb-1 ${classNames?.label} ${
          showError ? "text-red-500" : ""
        }`}
      >
        {label}
      </label>
      {children}
      {showError && (
        <div className={`text-red-500 text-sm mt-1 ${classNames?.error}`}>
          {meta.error}
        </div>
      )}
      {max && max > 0 && (
        <div
          className={`text-sm text-gray-500 mt-1 text-end ${classNames?.counter}`}
        >
          {wordCount}/{max}
        </div>
      )}
    </div>
  );
};

export default FieldWrapper;
