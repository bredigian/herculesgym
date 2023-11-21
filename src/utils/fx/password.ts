import { compare, genSalt, hash } from "bcrypt"

export const hashPassword = async (value: string) => {
  const saltRounds = 10
  const salt = await genSalt(saltRounds)

  const hashedPassword = await hash(value, salt)

  return hashedPassword
}

export const comparePassword = async (value: string, hash: string) => {
  return await compare(value, hash)
}
