import { type Date, WeekDay } from "@/types/date.types"

export const useDay = () => {
  const todayDate = new Date()
  const tomorrowDate = new Date(todayDate.setDate(todayDate.getDate() + 1))

  const tomorrow: Date = {
    day: tomorrowDate.getDate(),
    month: tomorrowDate.getMonth(),
    year: tomorrowDate.getFullYear(),
    weekday: tomorrowDate.getDay(),
    dateString: `${WeekDay[tomorrowDate.getDay()]}. ${tomorrowDate.getDate()}/${
      tomorrowDate.getMonth() + 1
    }/${tomorrowDate.getFullYear()}`,
  }

  return {
    tomorrow,
  }
}
