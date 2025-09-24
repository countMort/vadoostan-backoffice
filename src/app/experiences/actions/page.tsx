import { Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { experience_actions_create_venue_route } from "@/constants/route-names"
import Link from "next/link"

export default function ExperienceActions() {
  return (
    <div className="grid grid-cols-12 gap-2 px-4">
      <Button
        component={Link}
        className="flex col-span-6 !text-lg !py-10"
        href={experience_actions_create_venue_route}
        variant="outlined"
      >
        <AddIcon className="ml-1" />
        مکان برگزاری
      </Button>
    </div>
  )
}
