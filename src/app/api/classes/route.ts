import Class from "@/models/Class"
import Inscription from "@/models/Inscription"
import { NextResponse } from "next/server"
import { connectToDB } from "@/utils/mongoose"

export const GET = async (req: Request) => {
  try {
    const weekday = new URL(req.url).searchParams.get("weekday")
    if (!weekday) throw new Error("El parámetro 'date' es requerido")

    await connectToDB()

    try {
      const classes = await Class.find({
        "days.weekday": weekday,
      })

      return NextResponse.json(
        {
          classes,
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

export const POST = async (req: Request) => {
  try {
    const inscription = await req.json()

    if (!inscription)
      throw new Error("Ocurrió un error al recibir los datos de la inscripción")

    await connectToDB()
    const newInscription = new Inscription(inscription)
    const savedInscription = await newInscription.save()

    try {
      return NextResponse.json(
        {
          message: "Inscripción realizada con éxito",
          inscription_id: savedInscription._id,
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
