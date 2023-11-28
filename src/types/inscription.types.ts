import { Date } from "./date.types"
import { User } from "./user.types"

export interface Inscription {
  class: string
  schedule: string
  date: Date
  user: User
}
