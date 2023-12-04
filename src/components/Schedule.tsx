import { useEffect, useState } from "react"

import AdminTableBook from "./AdminTableBook"
import { CircularProgress } from "@nextui-org/react"
import TableBook from "./TableBook"
import { toast } from "sonner"
import { useClassesStore } from "@/store/classes"
import { useDay } from "@/hooks/useDay"

const Schedule = () => {
  const { today } = useDay()
  const { classes, getClasses } = useClassesStore()

  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      await getClasses(today)
    } catch (error: any) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section className="flex flex-col gap-10 items-center w-full">
      <span className="text-sm font-semibold">{today?.dateString}</span>
      {!loading ? (
        <AdminTableBook day={today} classes={classes} />
      ) : (
        <section className="grid place-items-center w-full">
          <CircularProgress
            color="default"
            size="lg"
            aria-label="Loading Form ..."
          />
        </section>
      )}
    </section>
  )
}

export default Schedule
