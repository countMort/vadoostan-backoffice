import Image from "next/image";
import { ChangeEvent } from "react";
import FieldWrapper from "./Partials/FieldWrapper";
import { BaseInputProps } from "@/types/form";
import { useField } from "formik";
export default function FileInput({
  classNames,
  label = "Upload multiple files",
  name,
}: BaseInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files || [];
    const fileList = Array.from(selected);
    helpers.setValue([...files, ...fileList]);
  };
  const handleRemove = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    helpers.setValue(updated);
  };
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const files = (field.value as any[]) || [];

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
      />
      <div className="flex flex-wrap gap-4 mt-2">
        {files.map((file, idx) => (
          <div key={idx} className="relative">
            <Image
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="object-cover rounded"
              width={96}
              height={48}
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </FieldWrapper>
  );
}
