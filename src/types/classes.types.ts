import { Day } from "./day.types"

export interface Class {
  _id?: string
  name: string
  value: string
  days?: Day[]
}
