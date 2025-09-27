"use client"

import { Button } from "@mui/material"
import Form from "@/components/Global/Form/FormWrapper"
import TextField from "@/components/Global/Form/TextField"
import FileInput from "@/components/Global/Form/FileInput"
import {
  create_director_form_initial_values,
  create_director_form_validation_schema,
} from "@/constants/experiences"
import { useRouter } from "next/navigation"
import { use, useCallback, useRef } from "react"
import { FormikProps } from "formik"
import {
  useCreateDirectorMutation,
  useUpdateDirectorMutation,
} from "@/api/experiences/directors"
import { toast } from "react-toastify"
import { experience_actions_route } from "@/constants/route-names"

export default function DirectorCredit({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const { id: directorId } = use(params) // Extract params for component hydration
  const isEdit = directorId !== "create"
  const formikRef =
    useRef<FormikProps<typeof create_director_form_initial_values>>(null)

  const [createDirector, { isLoading: isCreatingDirector }] =
    useCreateDirectorMutation()
  const [updateDirector, { isLoading: isUpdatingDirector }] =
    useUpdateDirectorMutation()

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const result = reader.result as string
        // Remove the data:image/...;base64, prefix
        const base64 = result.split(",")[1]
        resolve(base64)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = useCallback(
    async (data: typeof create_director_form_initial_values) => {
      try {
        console.log("Director form data:", data)

        const { image, ...directorData } = data

        // Convert image to base64 if provided
        let photoBase64 = ""
        if (image && image.length > 0) {
          try {
            photoBase64 = await fileToBase64(image[0])
          } catch (error) {
            console.error("Error converting image to base64:", error)
            toast("خطا در تبدیل عکس. لطفاً دوباره تلاش کنید.")
            return
          }
        }

        const directorPayload = {
          ...directorData,
          photo: photoBase64,
        }

        if (isEdit) {
          // Update existing director
          await updateDirector({
            directorId,
            director: directorPayload,
          }).unwrap()
          toast("تجربه‌گردان با موفقیت ویرایش شد.")
        } else {
          // Create new director
          await createDirector(directorPayload).unwrap()
          toast("تجربه‌گردان با موفقیت ثبت شد.")
        }

        router.push(experience_actions_route)
      } catch (error) {
        console.error("Error creating/updating director:", error)
        toast("خطا در ثبت تجربه‌گردان. لطفاً دوباره تلاش کنید.")
      }
    },
    [createDirector, updateDirector, directorId, isEdit, router]
  )

  const isLoading = isCreatingDirector || isUpdatingDirector

  return (
    <Form
      initialValues={create_director_form_initial_values}
      onSubmit={handleSubmit}
      validationSchema={create_director_form_validation_schema}
      formikRef={formikRef}
      classNames={{ form: "grid grid-cols-12 gap-4 py-5" }}
    >
      {() => (
        <>
          <div className="col-span-12">
            {" "}
            {!isEdit ? "ثبت" : "به روز رسانی"} تجربه گردان
          </div>
          <TextField
            name="firstName"
            label="نام"
            className="col-span-12 sm:col-span-6"
          />

          <TextField
            name="lastName"
            label="نام خانوادگی"
            className="col-span-12 sm:col-span-6"
          />

          <TextField
            name="mobileNumber"
            label="شماره موبایل"
            className="col-span-12 sm:col-span-6"
            placeholder="09123456789"
            dir="ltr"
          />

          <TextField
            name="jobTitle"
            label="عنوان شغلی"
            className="col-span-12 sm:col-span-6"
          />

          <TextField
            name="bio"
            label="بیوگرافی"
            multiline
            minRows={4}
            className="col-span-12"
            placeholder="بیوگرافی تجربه‌گردان را وارد کنید..."
          />

          <FileInput
            name="image"
            label="عکس تجربه‌گردان"
            classNames={{ wrapper: "col-span-12" }}
          />

          <div className="col-span-12 flex gap-2 mt-4">
            <Button
              type="submit"
              variant="contained"
              className="!bg-primary"
              loading={isLoading}
            >
              {isEdit ? "ویرایش تجربه‌گردان" : "ثبت تجربه‌گردان"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              انصراف
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
