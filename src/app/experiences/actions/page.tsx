import { Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import {
  experience_actions_venues_route,
  experience_actions_directors_route,
  experience_actions_create_category_route,
} from "@/constants/route-names"
import Link from "next/link"

export default function ExperienceActions() {
  const buttons = [
    {
      title: "مکان برگزاری",
      href: experience_actions_venues_route,
    },
    {
      title: "تجربه گردان",
      href: experience_actions_directors_route,
    },
    {
      title: "قبیله",
      href: experience_actions_create_category_route,
      icon: <AddIcon className="ml-1" />,
    },
  ]

  return (
    <div className="grid grid-cols-12 gap-2 px-4">
      {buttons.map((button) => (
        <Button
          key={button.title}
          component={Link}
          className="flex col-span-6 !text-lg !py-10"
          href={button.href}
          variant="outlined"
        >
          {button.icon}
          {button.title}
        </Button>
      ))}
    </div>
  )
}
