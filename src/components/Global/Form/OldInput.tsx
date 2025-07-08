// "use client";

// import { TextFieldProps } from "@/types/form";
// import { useField, useFormikContext } from "formik";
// import { useMemo } from "react";
// import FieldWrapper from "./Partials/FieldWrapper";

// export default function Input({
//   name,
//   type = "text",
//   classNames,
//   placeholder,
//   readonly,
//   notFormik,
//   value,
//   ...rest
// }: TextFieldProps) {
//   const [field, meta] = useField(name);
//   const { values } = useFormikContext<Record<string, string>>();

//   const wordCount = useMemo(() => {
//     const val = values[name] || "";
//     return val.length;
//   }, [values, name]);

//   return (
//     <FieldWrapper
//       classNames={classNames}
//       name={name}
//       wordCount={wordCount}
//       meta={meta}
//       {...rest}
//     >
//       <input
//         {...(notFormik ? {} : field)}
//         value={value || undefined}
//         type={type}
//         id={name}
//         className={`w-full px-3 py-2 border border-gray-300 rounded shadow-sm
//           focus:outline-none focus:ring-2 focus:ring-blue-500 ${classNames?.input}`}
//         placeholder={placeholder}
//         readOnly={readonly}
//       />
//     </FieldWrapper>
//   );
// }
