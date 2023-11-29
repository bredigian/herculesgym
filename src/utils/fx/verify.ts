import { type Date as DateT } from "@/types/date.types"

export const inscriptionIsOld = (day: DateT, time: string) => {
  return (
    new Date(
      day.year,
      day.month,
      day.day,
      parseInt(time.split(":")[0]),
      parseInt(time.split(":")[1])
    ) < new Date()
  )
}
