import { ChangeEvent } from "react"
import FieldWrapper from "./Partials/FieldWrapper"
import { BaseInputProps } from "@/types/form"
import { useField } from "formik"
import { FileInputPreview } from "./Partials/FileInputPreview"
export default function FileInput({
  classNames,
  label = "Upload multiple files",
  name,
  disabled,
  ...rest
}: BaseInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files || []
    const fileList = Array.from(selected)
    helpers.setValue([...files, ...fileList])
  }
  const handleRemove = (index: number) => {
    const updated = files.filter((_, i) => i !== index)
    helpers.setValue(updated)
  }
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  const files = (field.value as File[]) || []
  const images = files.map((file) => ({
    alt: file.name,
    url: URL.createObjectURL(file),
  }))

  return (
    <FieldWrapper label={label} meta={meta} classNames={classNames} name={name}>
      <input
        className={`block w-full text-sm py-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400 ${
          showError ? "border-red-500" : ""
        }`}
        id="multiple_files"
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      />
      <FileInputPreview
        className="mt-2"
        images={images}
        disabled={disabled}
        onRemove={handleRemove}
      />
    </FieldWrapper>
  )
}
