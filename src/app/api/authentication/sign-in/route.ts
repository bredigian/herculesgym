import { NextResponse } from "next/server"
import User from "@/models/User"
import { comparePassword } from "@/utils/fx/password"
import { connectToDB } from "@/utils/mongoose"
import { createToken } from "@/utils/fx/jwt"

export const POST = async (req: Request) => {
  const { username, password } = await req.json()

  await connectToDB()

  try {
    const user = await User.findOne({ username })
    if (!user) throw new Error("El usuario ingresado no existe")

    if (!(await comparePassword(password, user.password))) {
      return NextResponse.json(
        {
          message: "Usuario y/o contraseña incorrecta",
        },
        {
          status: 401,
          statusText: "Unauthorized",
        }
      )
    } else {
      const token = createToken(username)

      return NextResponse.json(
        {
          user,
          token,
        },
        {
          status: 200,
          statusText: "OK",
        }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
        statusText: "Bad Request",
      }
    )
  }
}
