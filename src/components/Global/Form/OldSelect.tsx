// import { SelectProps } from "@/types/form";
// import FieldWrapper from "./Partials/FieldWrapper";
// import { useField } from "formik";

// const Select = ({
//   name,
//   classNames,
//   placeholder,
//   options,
//   ...rest
// }: SelectProps) => {
//   const [field, meta] = useField(name);
//   return (
//     <FieldWrapper classNames={classNames} name={name} meta={meta} {...rest}>
//       <select
//         id="countries"
//         className={`w-full px-3 py-2 border border-gray-300 rounded  focus:ring-blue-500 focus:border-blue-500 block bg-background`}
//         {...field}
//       >
//         {placeholder && <option selected>{placeholder}</option>}
//         {options.map((option) => (
//           <option value={option.value} key={`select-${option.value}`}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </FieldWrapper>
//   );
// };

// export default Select;
