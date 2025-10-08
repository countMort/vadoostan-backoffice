"use client"

import { Button, MenuItem } from "@mui/material"
import Form from "@/components/Global/Form/FormWrapper"
import TextField from "@/components/Global/Form/TextField"
import {
  create_venue_form_initial_values,
  create_venue_form_validation_schema,
  update_venue_form_validation_schema,
  defaultCity,
} from "@/constants/experiences"
import { useRouter } from "next/navigation"
import { use, useCallback, useRef, useEffect, useMemo } from "react"
import { FormikProps } from "formik"
import { useGetExperienceCreationDataQuery } from "@/api/experiences"
import {
  useCreateVenueMutation,
  useUpdateVenueMutation,
  useGetVenuesQuery,
} from "@/api/experiences/venues"
import { toast } from "react-toastify"
import { experience_actions_route } from "@/constants/route-names"

export default function VenueCredit({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const { id: venueId } = use(params)
  const isEdit = venueId !== "create"
  const formikRef =
    useRef<FormikProps<typeof create_venue_form_initial_values>>(null)

  const {
    data: { result: creationData } = {},
    isLoading: isLoadingCreationData,
  } = useGetExperienceCreationDataQuery()

  const [createVenue, { isLoading: isCreatingVenue }] = useCreateVenueMutation()
  const [updateVenue, { isLoading: isUpdatingVenue }] = useUpdateVenueMutation()

  // Fetch venues data for editing
  const { data: { result: venues } = {}, isLoading: isLoadingVenue } =
    useGetVenuesQuery(undefined, { skip: !isEdit })

  const venue = useMemo(
    () => venues?.find((v) => v.id === venueId),
    [venues, venueId]
  )

  // Populate form with existing venue data
  useEffect(() => {
    if (isEdit && venue && formikRef.current) {
      if (venue) {
        // Convert coordinates back to Google Maps URL format
        const googleMapUrl = `https://maps.google.com/@${venue.location.latitude},${venue.location.longitude},15z`

        formikRef.current.setValues({
          title: venue.title,
          neighborhood: venue.address.neighborhood,
          city:
            creationData?.cities.find((city) => city.id === venue.cityId) ||
            defaultCity,
          fullAddress: venue.address.exact,
          googleMap: googleMapUrl,
        })
      }
    }
  }, [isEdit, venue, venueId, creationData])

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

        if (isEdit) {
          // Update existing venue
          await updateVenue({
            venueId,
            venue: body,
          }).unwrap()
          toast("مکان با موفقیت ویرایش شد.")
        } else {
          // Create new venue
          await createVenue(body).unwrap()
          toast("مکان با موفقیت ثبت شد.")
        }

        router.push(experience_actions_route)
      } catch (error) {
        console.error("Error creating/updating venue:", error)
        toast("خطا در ثبت مکان. لطفاً دوباره تلاش کنید.")
      }
    },
    [createVenue, updateVenue, venueId, isEdit, router]
  )

  const isLoading =
    isCreatingVenue ||
    isUpdatingVenue ||
    isLoadingVenue ||
    isLoadingCreationData

  return (
    <Form
      initialValues={create_venue_form_initial_values}
      onSubmit={handleSubmit}
      validationSchema={
        isEdit
          ? update_venue_form_validation_schema
          : create_venue_form_validation_schema
      }
      formikRef={formikRef}
      classNames={{ form: "grid grid-cols-12 gap-4 py-5" }}
      loading={isLoading}
    >
      {({ setFieldValue }) => (
        <>
          <div className="col-span-12">
            {!isEdit ? "ایجاد مکان جدید" : "ویرایش مکان"}
          </div>
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
            placeholder="https://maps.google.com/.../@35.7219,51.3347,15z"
          />

          <div className="col-span-12 flex gap-2">
            <Button
              type="submit"
              variant="contained"
              className="!bg-primary"
              loading={isLoading}
            >
              {isEdit ? "ویرایش مکان" : "ثبت مکان"}
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
