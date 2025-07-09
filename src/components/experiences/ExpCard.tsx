import { ExperienceCardProps } from "@/types/components/Experiences";
import { Typography } from "@mui/material";

export default function ExpCard({
  title = "تست",
  description = "توضیحات تست",
  category = "خلق",
}: ExperienceCardProps) {
  return (
    <div className="flex flex-row bg-white border border-gray-200 rounded-exp shadow-sm dark:border-gray-700 dark:bg-gray-800 p-2.5 h-20">
      <div className="h-full flex items-center shrink-0 justify-center self-center bg-gray-400 aspect-square rounded-exp">
        <Typography fontSize={14} fontWeight="bolder">{category}</Typography>
      </div>
      <div className="flex flex-col justify-between leading-normal mr-3.5">
        <Typography fontSize={14}>{title}</Typography>
        <Typography fontSize={12}>{description}</Typography>
      </div>
    </div>
  );
}
