"use client"

import { useGetExperiencesQuery } from "@/api"
import ExpCard from "@/components/experiences/ExpCard"
import {
  experience_edit_route,
  ExperiencePageStatus,
} from "@/constants/route-names"
import { useRouter, useSearchParams } from "next/navigation"

export default function Experiences() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status =
    (searchParams.get("status") as ExperiencePageStatus) ||
    ExperiencePageStatus.ACTIVE
  const { data } = useGetExperiencesQuery({
    status,
  })
  return (
    <div className="flex p-2 gap-y-2 flex-col max-w-94 mx-auto">
      {data?.map((exp, i) => (
        <ExpCard
          key={i}
          onClick={() => router.push(experience_edit_route(exp.id))}
          date={exp.date}
          time={exp.time}
          title={exp.title}
          neighbourhood={exp.address}
          category={exp.category}
          capacity={exp.capacity}
          registrations={exp.registrations}
          status={exp.status}
        />
      ))}
    </div>
  )
}
