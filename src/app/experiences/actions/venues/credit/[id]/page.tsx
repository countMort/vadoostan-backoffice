"use client"

import { Button, MenuItem } from "@mui/material"
import Form from "@/components/Global/Form/FormWrapper"
import TextField from "@/components/Global/Form/TextField"
import {
  create_venue_form_initial_values,
  create_venue_form_validation_schema,
  defaultCity,
} from "@/constants/experiences"
import { useRouter } from "next/navigation"
import { use, useCallback, useRef } from "react"
import { FormikProps } from "formik"
import { useGetExperienceCreationDataQuery } from "@/api/experiences"
import { useCreateVenueMutation } from "@/api/experiences/venues"
import { toast } from "react-toastify"
import { experience_actions_route } from "@/constants/route-names"

export default function VenueCredit({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  use(params) // Extract params for component hydration
  const formikRef =
    useRef<FormikProps<typeof create_venue_form_initial_values>>(null)

  const { data: { result: creationData } = {}, isLoading } =
    useGetExperienceCreationDataQuery()

  const [createVenue, { isLoading: isCreatingVenue }] = useCreateVenueMutation()

  const handleSubmit = useCallback(
    async (data: typeof create_venue_form_initial_values) => {
      try {
        console.log("Venue form data:", data)
        const [lat, lng] = data.googleMap.split("/@")[1].split(",")
        const body = {
          title: data.title,
          fullAddress: data.fullAddress,
          location: { latitude: Number(lat), longitude: Number(lng) },
          cityId: data.city.id,
          neighborhood: data.neighborhood,
        }
        await createVenue(body).unwrap()
        toast("مکان با موفقیت ثبت شد.")
        router.push(experience_actions_route)
      } catch (error) {
        console.error("Error creating venue:", error)
      }
    },
    [createVenue, router]
  )
  return (
    <Form
      initialValues={create_venue_form_initial_values}
      onSubmit={handleSubmit}
      validationSchema={create_venue_form_validation_schema}
      formikRef={formikRef}
      classNames={{ form: "grid grid-cols-12 gap-4" }}
      loading={isLoading || isCreatingVenue}
    >
      {({ setFieldValue }) => (
        <>
          <TextField
            name="title"
            label="نام مکان"
            className="col-span-12 sm:col-span-6"
          />

          <TextField
            name="neighborhood"
            label="محله"
            className="col-span-12 sm:col-span-6"
          />

          <TextField
            name="city.id"
            label="شهر"
            select
            className="col-span-12 sm:col-span-6"
            onChange={(val) => {
              setFieldValue(
                "city",
                creationData?.cities.find(
                  (city) => city.id === Number(val.target.value)
                ) || defaultCity
              )
            }}
          >
            <MenuItem value={defaultCity.id}>{defaultCity.title}</MenuItem>
            {creationData?.cities
              .filter((city) => city.id !== defaultCity.id)
              .map((city) => (
                <MenuItem key={`city-${city.title}`} value={city.id}>
                  {city.title}
                </MenuItem>
              ))}
          </TextField>

          <TextField
            name="fullAddress"
            label="آدرس کامل"
            multiline
            minRows={3}
            className="col-span-12"
          />

          <TextField
            name="googleMap"
            label="لینک گوگل مپ"
            dir="ltr"
            className="col-span-12"
            placeholder="https://maps.google.com/..."
          />

          <div className="col-span-12 flex gap-2">
            <Button
              type="submit"
              variant="contained"
              className="!bg-primary"
              disabled={isCreatingVenue}
            >
              {isCreatingVenue ? "در حال ثبت..." : "ثبت مکان"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => router.push("/experiences")}
            >
              انصراف
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
