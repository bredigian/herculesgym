import { Schema, model, models } from "mongoose"

import { Date } from "@/types/date.types"
import { Inscription } from "@/types/inscription.types"
import { UserSchema } from "./User"

const DateSchema = new Schema<Date>({
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  dateString: {
    type: String,
    required: true,
  },
  weekday: {
    type: Number,
    required: true,
  },
})

const InscriptionSchema = new Schema<Inscription>({
  class: {
    type: String,
    required: true,
  },
  date: {
    type: DateSchema,
  },
  schedule: {
    type: String,
    required: true,
  },
  user: {
    type: UserSchema,
    required: true,
  },
})

export default models.Inscription ||
  model("Inscription", InscriptionSchema, "inscriptions")
