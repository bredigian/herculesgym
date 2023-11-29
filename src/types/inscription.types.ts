import { Class } from "./classes.types"
import { Date } from "./date.types"
import { User } from "./user.types"

export interface Inscription {
  _id?: string
  class: Class
  schedule: string
  date: Date
  user: User
}
