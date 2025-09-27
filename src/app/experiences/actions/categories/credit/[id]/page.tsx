"use client"

import { Button } from "@mui/material"
import Form from "@/components/Global/Form/FormWrapper"
import TextField from "@/components/Global/Form/TextField"
import {
  create_category_form_initial_values,
  create_category_form_validation_schema,
} from "@/constants/experiences"
import { useRouter } from "next/navigation"
import { use, useCallback, useRef } from "react"
import { FormikProps } from "formik"
import { useCreateCategoryMutation } from "@/api/experiences/categories"
import { toast } from "react-toastify"
import { experience_actions_route } from "@/constants/route-names"

export default function CategoryCredit({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  use(params) // Extract params for component hydration
  const formikRef =
    useRef<FormikProps<typeof create_category_form_initial_values>>(null)

  const [createCategory, { isLoading: isCreatingCategory }] =
    useCreateCategoryMutation()

  const handleSubmit = useCallback(
    async (data: typeof create_category_form_initial_values) => {
      try {
        console.log("Category form data:", data)

        await createCategory(data).unwrap()
        toast("قبیله با موفقیت ثبت شد.")
        router.push(experience_actions_route)
      } catch (error) {
        console.error("Error creating category:", error)
        toast("خطا در ثبت قبیله. لطفاً دوباره تلاش کنید.")
      }
    },
    [createCategory, router]
  )

  return (
    <Form
      initialValues={create_category_form_initial_values}
      onSubmit={handleSubmit}
      validationSchema={create_category_form_validation_schema}
      formikRef={formikRef}
      classNames={{ form: "grid grid-cols-12 gap-4 py-5" }}
    >
      {() => (
        <>
          <div className="col-span-12">ساخت قبیله جدید</div>
          <TextField
            name="faTitle"
            label="عنوان فارسی"
            className="col-span-12 sm:col-span-6"
            placeholder="مثال: وتن"
          />
          <TextField
            name="enTitle"
            label="عنوان انگلیسی"
            className="col-span-12 sm:col-span-6"
            placeholder="مثال: va tan"
            dir="ltr"
          />
          <div className="col-span-12 flex gap-2 mt-4">
            <Button
              type="submit"
              variant="contained"
              className="!bg-primary"
              loading={isCreatingCategory}
            >
              {isCreatingCategory ? "در حال ثبت..." : "ثبت قبیله"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => router.back()}
              disabled={isCreatingCategory}
            >
              انصراف
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
