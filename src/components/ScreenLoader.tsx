import { CircularProgress } from "@nextui-org/react"

const ScreenLoader = () => {
  return (
    <main className="grid place-items-center h-screen">
      <CircularProgress color="default" size="lg" aria-label="Loading ..." />
    </main>
  )
}

export default ScreenLoader
