"use client"

import { Button } from "@mui/material"
import { useGetVenuesQuery } from "@/api/experiences/venues"
import {
  experience_actions_create_venue_route,
  experience_actions_edit_venue_route,
} from "@/constants/route-names"
import Link from "next/link"
import Spinner from "@/components/Global/Spinner/Spinner"
import AddIcon from "@mui/icons-material/Add"

export default function VenuesPage() {
  const { data, isLoading, error } = useGetVenuesQuery()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-red-500">خطا در بارگذاری لیست مکان‌ها</p>
      </div>
    )
  }

  const venues = data?.result || []

  return (
    <div className="grid grid-cols-12 gap-2 px-4">
      <div className="col-span-12">
        <Button
          component={Link}
          href={experience_actions_create_venue_route}
          variant="contained"
          className="w-full !py-4 !mb-2"
        >
          <AddIcon />
          افزودن مکان
        </Button>
      </div>
      {venues.map((venue) => (
        <Button
          key={venue.id}
          component={Link}
          className="flex flex-col col-span-6 sm:col-span-4 md:col-span-3 !min-h-25 !py-2 text-center"
          href={experience_actions_edit_venue_route(venue.id)}
          variant="outlined"
        >
          <div className="font-medium text-lg mb-2">{venue.title}</div>
          <div className="text-gray-600">{venue.address.neighborhood}</div>
        </Button>
      ))}
    </div>
  )
}
