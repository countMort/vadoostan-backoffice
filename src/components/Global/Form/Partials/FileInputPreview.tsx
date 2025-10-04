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
      {images.map((img, idx) => {
        // Check if it's a blob URL (from uploaded file) or a regular URL
        const isBlobUrl = img.url.startsWith("blob:")
        
        return (
          <div key={idx} className="relative">
            <Image
              src={img.url}
              alt={img.alt}
              className="object-cover rounded"
              width={96}
              height={48}
              unoptimized={isBlobUrl} // Use unoptimized for blob URLs
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
        )
      })}
    </div>
  )
}
