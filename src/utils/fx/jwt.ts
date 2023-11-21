import { JwtPayload, sign, verify } from "jsonwebtoken"

export const createToken = (username: string) => {
  const token = sign({ username }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "31d",
  })

  return token
}

export const validateToken = async (token: string) => {
  const decoded = verify(token, process.env.JWT_SECRET_KEY as string) as
    | string
    | JwtPayload

  const currentDate = Date.now()

  return typeof decoded === "string"
    ? false
    : (decoded.exp as number) * 1000 > currentDate
}
