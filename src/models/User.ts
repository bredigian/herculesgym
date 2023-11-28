import { Schema, model, models } from "mongoose"

import { User } from "@/types/user.types"

export const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

export default models.User || model<User>("User", UserSchema, "users")
