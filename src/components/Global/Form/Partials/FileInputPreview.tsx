import { FileInputPreviewProps } from "@/types/form"
import Image from "next/image"

export const FileInputPreview = ({
  images,
  disabled,
  onRemove,
  className,
}: FileInputPreviewProps) => {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {images.map((img, idx) => (
        <div key={idx} className="relative">
          <Image
            src={img.url}
            alt={img.alt}
            className="object-cover rounded"
            width={96}
            height={48}
          />
          {!disabled && (
            <button
              type="button"
              onClick={() => onRemove?.(idx)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
