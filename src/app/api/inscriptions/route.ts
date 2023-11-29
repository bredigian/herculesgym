import Inscription from "@/models/Inscription"
import { NextResponse } from "next/server"
import { connectToDB } from "@/utils/mongoose"
import { type Inscription as InscriptionT } from "@/types/inscription.types"

export const GET = async (req: Request) => {
  try {
    const id = new URL(req.url).searchParams.get("id")
    if (!id) throw new Error("No se ha recibido el ID solicitado")

    await connectToDB()

    try {
      const inscriptions: InscriptionT[] = await Inscription.find({
        "user._id": id,
      })
      const sortedInscriptions = inscriptions.sort((a, b) => {
        const dateA: any = new Date(
          a.date.year,
          a.date.month,
          a.date.day,
          parseInt(a.schedule.split(":")[0]),
          parseInt(a.schedule.split(":")[1])
        )
        const dateB: any = new Date(
          b.date.year,
          b.date.month,
          b.date.day,
          parseInt(b.schedule.split(":")[0]),
          parseInt(b.schedule.split(":")[1])
        )
        return dateA - dateB
      })
      return NextResponse.json(
        {
          message: "Inscripciones obtenidas con éxito",
          inscriptions: sortedInscriptions,
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
