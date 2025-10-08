const Spinner = ({ className }: { className?: string }) => (
  <>
    <div
      className={`animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main mx-auto ${className}`}
    ></div>
    <span className="sr-only">Loading...</span>
  </>
)

export default Spinner
