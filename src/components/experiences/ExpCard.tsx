import { ExperienceCardProps } from "@/types/components/experiences";
import ExpChip from "./ExpChip";
import { toPersianDigits } from "@/utils/locale";
import OrangeDot from "../Global/Icons/OrangeDot";
import { ExperienceStatus } from "@/types/api";
import { ComponentProps } from "react";
import { catDic } from "@/constants";

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
};

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
      className="px-6 py-1 space-y-2 border-gray-300 dark:border-gray-600 rounded-10 border md:border-0 md:shadow-xs md:dark:shadow-white w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="text-14">{title}</div>
      <div className="flex gap-x-2">
        <ExpChip>{catDic[category as keyof typeof catDic] || category}</ExpChip>
        <ExpChip variant={statusDic[status].color}>
          {statusDic[status].label}
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
  );
}

// Client Exp Card
{
  /* <div className="flex flex-row bg-white border border-gray-200 rounded-10 shadow-sm dark:border-gray-700 dark:bg-gray-800 p-2.5 h-20">
      <div className="h-full flex items-center shrink-0 justify-center self-center bg-gray-400 aspect-square rounded-10">
        <Typography fontSize={14} fontWeight="bolder">{category}</Typography>
      </div>
      <div className="flex flex-col justify-between leading-normal mr-3.5">
        <Typography fontSize={14}>{title}</Typography>
        <Typography fontSize={12}>{description}</Typography>
      </div>
    </div> */
}
