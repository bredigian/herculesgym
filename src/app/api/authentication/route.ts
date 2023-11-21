import { NextResponse } from "next/server"
import { type User as UserType } from "@/types/user.types"
import { connectToDB } from "@/utils/mongoose"
import User from "@/models/User"
import { formatName } from "@/utils/fx/format"
import { hashPassword } from "@/utils/fx/password"
import { createToken } from "@/utils/fx/jwt"

export const POST = async (req: Request) => {
  const userdata: UserType = await req.json()
  await connectToDB()

  try {
    const formattedName = formatName(userdata.name)
    if (!formattedName) throw new Error("El nombre no es valido")

    const userExists = await User.findOne({ username: userdata.username })
    if (userExists) throw new Error("El usuario ya existe")

    const hashedPassword = await hashPassword(userdata.password)

    const user = new User({
      ...userdata,
      name: formattedName,
      password: hashedPassword,
    })

    const savedUser = await user.save()

    const token = createToken(userdata.username)

    return NextResponse.json(
      {
        user: savedUser,
        token: token,
        message: "Usuario creado exitosamente",
      },
      {
        status: 201,
        statusText: "Created",
      }
    )
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
