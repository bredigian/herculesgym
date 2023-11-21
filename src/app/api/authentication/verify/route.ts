import { NextResponse } from "next/server"
import User from "@/models/User"
import { connectToDB } from "@/utils/mongoose"
import { validateToken } from "@/utils/fx/jwt"

export const GET = async (req: Request) => {
  const token = new URL(req.url).searchParams.get("token")
  const user_id = new URL(req.url).searchParams.get("user_id")

  if (!token) throw new Error("El token es requerido")

  if (!(await validateToken(token))) {
    return NextResponse.json(
      {
        message: "La sesión ha expirado",
      },
      {
        status: 401,
        statusText: "Unauthorized",
      }
    )
  }

  await connectToDB()

  try {
    const user = await User.findById(user_id)
    return NextResponse.json(
      {
        user,
      },
      {
        status: 200,
        statusText: "OK",
      }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    )
  }
}
