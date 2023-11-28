import { Schedule } from "./schedule.types"

export interface Day {
  id: string
  name: string
  value: string
  weekday: number
  schedules: Schedule[]
}
