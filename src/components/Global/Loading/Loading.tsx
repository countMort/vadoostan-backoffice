import Spinner from "./Spinner"

export default function Loading() {
  return (
    <div className="text-center">
      <Spinner />
      <p className="mt-4 text-primary-main">در حال بارگذاری...</p>
    </div>
  )
}
