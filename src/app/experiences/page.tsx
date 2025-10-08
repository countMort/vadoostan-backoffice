"use client"

import { useGetExperiencesQuery } from "@/api/experiences"
import ExpCard from "@/components/experiences/ExpCard"
import { experience_edit_route } from "@/constants/route-names"
import { RootState } from "@/store"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { setStatus } from "./experiences.slice"
import { ExperiencesListStatus } from "@/types/api"
import Spinner from "@/components/Global/Loading/Spinner"

export default function Experiences() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { status } = useSelector((state: RootState) => state.experiences.base)
  const { data, isLoading } = useGetExperiencesQuery({
    status,
  })
  const onStatusClick = (
    event: React.MouseEvent<HTMLElement>,
    value: ExperiencesListStatus
  ) => {
    dispatch(setStatus(value))
  }
  return (
    <div className="flex px-2 gap-y-2 flex-col max-w-94 mx-auto">
      <ToggleButtonGroup value={status}>
        <ToggleButton
          value={ExperiencesListStatus.ACTIVE}
          onChange={onStatusClick}
          color="primary"
          fullWidth
          className="!rounded-r-10"
        >
          فعال
        </ToggleButton>
        <ToggleButton
          value={ExperiencesListStatus.INACTIVE}
          onChange={onStatusClick}
          color="primary"
          fullWidth
          className="!rounded-l-10"
        >
          غیر فعال
        </ToggleButton>
      </ToggleButtonGroup>
      {isLoading ? (
        <Spinner className="mt-4" />
      ) : (
        data?.map((exp, i) => (
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
        ))
      )}
    </div>
  )
}
