import { RegistrationsListProps } from "@/types/components/experiences"
import { toast } from "react-toastify"

export const RegistrationsList = ({
  className,
  attendees,
}: RegistrationsListProps) => {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(attendees))
      toast("کپی شد")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div
      className={`border rounded p-2 ${className} space-y-1 hover:dark:bg-gray-900 hover:bg-gray-100`}
      onClick={copy}
    >
      <div>لیست ثبت نامی‌ها:</div>
      {attendees.map((attendee, index) => (
        <div
          className={`${index > 0 ? "border-t" : ""} space-y-1`}
          key={attendee.mobileNumber}
        >
          <div className="flex justify-between w-full">
            {attendee.name} {attendee.mobileNumber}
          </div>
          <div>وضعیت: {attendee.regStatus}</div>
        </div>
      ))}
    </div>
  )
}
