import { ExperienceCardProps } from "@/types/components/experiences"
import ExpChip from "./ExpChip"
import { toPersianDigits } from "@/utils/locale"
import OrangeDot from "../Global/Icons/OrangeDot"
import { ExperienceStatus } from "@/types/api"
import { ComponentProps } from "react"
import { catDic } from "@/constants"

const statusDic: Record<
  ExperienceStatus,
  { label: string; color: ComponentProps<typeof ExpChip>["variant"] }
> = {
  [ExperienceStatus.PUBLISHED]: {
    label: "منتشر شده",
    color: "green",
  },
  [ExperienceStatus.READY_TO_PUBLISH]: {
    label: "اماده انتشار",
    color: "blue",
  },
  [ExperienceStatus.CANCELLED]: {
    label: "کنسل شده",
    color: "pink",
  },
  [ExperienceStatus.INACTIVE]: {
    label: "انتظار تایید",
    color: "orange",
  },
  [ExperienceStatus.RUNNING]: {
    label: "در حال اجرا",
    color: "blue",
  },
}

export default function ExpCard({
  title = "جواهر سازی، ساخت گردنبند",
  category = "خلق",
  neighbourhood = "توحید",
  time = "15:00",
  date = "May 15",
  registrations,
  capacity,
  onClick,
  status,
}: ExperienceCardProps) {
  return (
    <div
      className="px-6 py-1 space-y-2 rounded-10 border border-divider md:dark:shadow-white w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="text-14">{title}</div>
      <div className="flex gap-x-2">
        <ExpChip>{catDic[category as keyof typeof catDic] || category}</ExpChip>
        <ExpChip variant={statusDic[status]?.color}>
          {statusDic[status]?.label || status}
        </ExpChip>
        <ExpChip
          variant={
            registrations === 0
              ? "orange"
              : registrations < capacity
              ? "blue"
              : "green"
          }
        >
          {toPersianDigits(registrations + " از " + capacity)}
        </ExpChip>
      </div>
      <div className="flex text-12 items-center gap-x-1">
        محله: {neighbourhood}
        <OrangeDot />
        ساعت: {toPersianDigits(time)}
        <OrangeDot />
        تاریخ: {date}
      </div>
    </div>
  )
}
