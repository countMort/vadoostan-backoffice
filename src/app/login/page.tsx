"use client"

import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "@/store"
import { loginStart, loginSuccess, loginFailure } from "@/app/auth/auth.slice"
import { useLoginMutation } from "@/api/auth"
import Form from "@/components/Global/Form/FormWrapper"
import TextField from "@/components/Global/Form/TextField"
import { Button } from "@mui/material"
import * as Yup from "yup"
import { FormikHelpers } from "formik"
import { useEffect } from "react"

interface LoginFormValues {
  username: string
  password: string
}

const validationSchema = Yup.object({
  username: Yup.string().required("نام کاربری الزامی است"),
  password: Yup.string().required("رمز عبور الزامی است"),
})

const initialValues: LoginFormValues = {
  username: "",
  password: "",
}

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  )
  const [loginMutation] = useLoginMutation()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/experiences")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      dispatch(loginStart())
      const result = await loginMutation({ ...values, client: "web" }).unwrap()

      dispatch(loginSuccess(result.result))
      router.push("/experiences")
    } catch (error: any) {
      dispatch(loginFailure())
      setFieldError("username", error?.data?.message || "خطا در ورود")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-r from-gray-900 to-black p-4">
      <div className="max-w-400 w-full box-shadow-8px-32px-rgba-0-0-0-0-1 border-radius-2">
        <div className="text-2xl font-bold text-primary-main mb-3">
          بک آفیس و دوستان
        </div>

        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          loading={isLoading}
          classNames={{
            wrapper: "w-full",
            form: "space-y-4 p-5",
          }}
        >
          {(formik) => (
            <>
              <TextField
                name="username"
                label="نام کاربری"
                placeholder="نام کاربری خود را وارد کنید"
                variant="outlined"
                disabled={isLoading}
              />

              <TextField
                name="password"
                label="رمز عبور"
                type="password"
                placeholder="رمز عبور خود را وارد کنید"
                variant="outlined"
                disabled={isLoading}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading || !formik.isValid}
                sx={{
                  marginTop: 2,
                  padding: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
              >
                {isLoading ? "در حال ورود..." : "ورود"}
              </Button>
            </>
          )}
        </Form>
      </div>
    </div>
  )
}
