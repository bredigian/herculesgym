import { Schema, model, models } from "mongoose"

import { Class } from "@/types/classes.types"
import { DaySchema } from "./Day"

export const ClassSchema = new Schema<Class>({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  days: {
    type: [DaySchema],
    required: true,
  },
})

export default models.Class || model<Class>("Class", ClassSchema, "classes")
