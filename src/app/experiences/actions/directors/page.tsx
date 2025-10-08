"use client"

import { Button } from "@mui/material"
import { useGetDirectorsQuery } from "@/api/experiences/directors"
import {
  experience_actions_create_director_route,
  experience_actions_edit_director_route,
} from "@/constants/route-names"
import Link from "next/link"
import Spinner from "@/components/Global/Loading/Spinner"
import AddIcon from "@mui/icons-material/Add"

export default function DirectorsPage() {
  const { data, isLoading, error } = useGetDirectorsQuery()

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
        <p className="text-red-500">خطا در بارگذاری لیست تجربه‌گردان‌ها</p>
      </div>
    )
  }

  const directors = data?.result?.directors || []

  return (
    <div className="grid grid-cols-12 gap-2 px-4">
      <div className="col-span-12">
        <Button
          component={Link}
          href={experience_actions_create_director_route}
          variant="contained"
          className="w-full !py-4 !mb-2"
        >
          <AddIcon />
          افزودن تجربه‌گردان
        </Button>
      </div>
      {directors.map((director) => (
        <Button
          key={director.userId}
          component={Link}
          className="flex flex-col col-span-6 sm:col-span-4 md:col-span-3 !min-h-25 !py-2"
          href={experience_actions_edit_director_route(director.userId)}
          variant="outlined"
        >
          <div className="font-medium text-lg mb-2">{director.name}</div>
          {director.jobTitle && (
            <div className="text-gray-600">{director.jobTitle}</div>
          )}
        </Button>
      ))}
    </div>
  )
}
