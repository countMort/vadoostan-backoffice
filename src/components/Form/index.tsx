import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import TextInput from "./TextInput";
import Textarea from "./Textarea";
import { FormProps } from "@/types/form";

const Form = ({ onSubmit, defaultValues, children }: FormProps) => {
  const methods = useForm({
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        {children}
      </form>
    </FormProvider>
  );
};

export { TextInput, Textarea };
export default Form;
