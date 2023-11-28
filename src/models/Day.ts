import { Schema, model, models } from "mongoose"

import { Day } from "@/types/day.types"
import { Schedule } from "@/types/schedule.types"

const ScheduleSchema = new Schema<Schedule>({
  hour: {
    type: Number,
    required: true,
  },
  minutes: {
    type: Number,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})

export const DaySchema = new Schema<Day>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: String,
    required: true,
    trim: true,
  },
  weekday: {
    type: Number,
    required: true,
    trim: true,
  },
  schedules: {
    type: [ScheduleSchema],
    required: true,
  },
})

export default models.Day || model<Day>("Day", DaySchema, "days")
