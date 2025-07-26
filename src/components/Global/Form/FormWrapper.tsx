import { FormProps } from "@/types/form"
import { Formik, Form, FormikValues } from "formik"
import Spinner from "@/components/Global/Spinner/Spinner"

const FormWrapper = <T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  loading,
  formikRef,
  classNames,
}: FormProps<T>) => {
  return (
    <div
      className={`px-5 ${classNames?.wrapper ?? ""} ${
        loading
          ? "relative items-center block bg-white dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700 opacity-80"
          : ""
      }`}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formikRef}
      >
        {typeof children === "function" ? (
          (context) => (
            <Form className={classNames?.form}>{children(context)}</Form>
          )
        ) : (
          <Form className={classNames?.form}>{children}</Form>
        )}
      </Formik>
      {loading && (
        <Spinner className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2" />
      )}
    </div>
  )
}

export default FormWrapper
