import { ChangeEvent, useState } from "react"
import FieldWrapper from "./Partials/FieldWrapper"
import { BaseInputProps } from "@/types/form"
import { useField } from "formik"
import { FileInputPreview } from "./Partials/FileInputPreview"

export interface ExistingImage {
  url: string
  id?: string | number // Optional ID for tracking deletions
}

interface FileInputProps extends BaseInputProps {
  multiple?: boolean
  existingImageUrl?: string | string[] | ExistingImage | ExistingImage[] // URL(s) or existing image objects
  onDeleteExisting?: (id: string | number) => void // Callback when existing image is deleted
}

export default function FileInput({
  classNames,
  label = "Upload multiple files",
  name,
  disabled,
  multiple = true,
  existingImageUrl,
  onDeleteExisting,
  ...rest
}: FileInputProps) {
  const [field, meta, helpers] = useField(name)
  const [deletedExistingIds, setDeletedExistingIds] = useState<
    Set<string | number>
  >(new Set())
  const showError = meta.touched && meta.error

  const files = (field.value as File[]) || []

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files || []
    const fileList = Array.from(selected)

    if (multiple) {
      helpers.setValue([...files, ...fileList])
    } else {
      // For single file mode, replace with the new file
      helpers.setValue(fileList.length > 0 ? [fileList[0]] : [])
    }
  }

  const handleRemove = (index: number) => {
    const updated = files.filter((_, i) => i !== index)
    helpers.setValue(updated)
  }

  // Create existing images array from existingImageUrl
  const parseExistingImages = (
    source: FileInputProps["existingImageUrl"]
  ): ExistingImage[] => {
    if (!source) return []

    if (Array.isArray(source)) {
      return source.map((item, index) => {
        if (typeof item === "string") {
          return { url: item, id: index }
        }
        return item as ExistingImage
      })
    } else if (typeof source === "string") {
      return [{ url: source, id: 0 }]
    }
    return [source]
  }

  const allExistingImages = parseExistingImages(existingImageUrl)

  // Filter out deleted existing images
  const remainingExistingImages = allExistingImages.filter(
    (img) => !img.id || !deletedExistingIds.has(img.id)
  )

  // Create image preview array from uploaded files
  const uploadedImages = files.map((file, index) => ({
    alt: file.name,
    url: URL.createObjectURL(file),
    type: "uploaded" as const,
    index,
  }))

  // Create existing images for display
  const existingImagesForDisplay = remainingExistingImages.map(
    (img, index) => ({
      alt: `Existing image ${index + 1}`,
      url: img.url,
      type: "existing" as const,
      id: img.id,
      index,
    })
  )

  // Combine all images
  const allImages = [...existingImagesForDisplay, ...uploadedImages]

  // Handle removal of images
  const handleRemoveWrapper = (index: number) => {
    const imageToRemove = allImages[index]

    if (imageToRemove.type === "existing" && imageToRemove.id !== undefined) {
      // Mark existing image as deleted and call callback
      setDeletedExistingIds((prev) => new Set([...prev, imageToRemove.id!]))
      onDeleteExisting?.(imageToRemove.id)
    } else if (imageToRemove.type === "uploaded") {
      // Remove uploaded file
      handleRemove(imageToRemove.index)
    }
  }

  return (
    <FieldWrapper label={label} meta={meta} classNames={classNames} name={name}>
      <input
        className={`block w-full text-sm py-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400 ${
          showError ? "border-red-500" : ""
        }`}
        id={`file_input_${name}`}
        type="file"
        multiple={multiple}
        accept="image/*"
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      />
      <FileInputPreview
        className="mt-2"
        images={allImages.map((img) => ({ alt: img.alt, url: img.url }))}
        disabled={disabled}
        onRemove={handleRemoveWrapper}
      />
    </FieldWrapper>
  )
}
