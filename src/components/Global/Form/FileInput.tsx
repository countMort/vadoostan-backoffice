import { ChangeEvent, useState, useRef } from "react"
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
  existingImageUrls?: ExistingImage[]
  onDeleteExisting?: (id: string | number) => void
}

export default function FileInput({
  classNames,
  label = "Upload multiple files",
  name,
  disabled,
  multiple = true,
  existingImageUrls,
  onDeleteExisting,
  ...rest
}: FileInputProps) {
  const [field, meta, helpers] = useField(name)
  const [deletedExistingIds, setDeletedExistingIds] = useState<
    Set<string | number>
  >(new Set())
  const fileInputRef = useRef<HTMLInputElement>(null)
  const showError = meta.touched && meta.error

  const files = (field.value as File[]) || []

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files || []
    const fileList = Array.from(selected)

    if (multiple) {
      helpers.setValue([...files, ...fileList])
    } else {
      // For single file mode, replace with the new file and clear existing images
      if (fileList.length > 0) {
        helpers.setValue([fileList[0]])
        // Clear any existing images when uploading new file in single mode
        if (existingImageUrls && existingImageUrls.length > 0) {
          existingImageUrls.forEach((img) => {
            if (img.id !== undefined) {
              setDeletedExistingIds((prev) => new Set([...prev, img.id!]))
              onDeleteExisting?.(img.id)
            }
          })
        }
      } else {
        helpers.setValue([])
      }
    }
  }

  const handleRemove = (index: number) => {
    const updated = files.filter((_, i) => i !== index)
    helpers.setValue(updated)
    // Clear the file input to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Use existingImageUrl directly since it's now typed as ExistingImage[]
  const allExistingImages = existingImageUrls || []

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
        ref={fileInputRef}
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
