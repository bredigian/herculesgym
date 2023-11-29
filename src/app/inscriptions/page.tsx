"use client"

import { type Date as DateT, WeekDay } from "@/types/date.types"
import { useEffect, useState } from "react"

import Book from "@/components/Book"
import Screen from "@/components/Screen"
import ScreenLoader from "@/components/ScreenLoader"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import { toast } from "sonner"
import { useAuthStore } from "@/store/auth"
import { useDay } from "@/hooks/useDay"
import { useInscriptionsStore } from "@/store/inscriptions"
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"

const Inscriptions = () => {
  const { inscriptions, getInscriptions, deleteInscription } =
    useInscriptionsStore()
  const { today } = useDay()
  const { user } = useAuthStore()

  const [loading, setLoading] = useState(true)

  const [day, setDay] = useState<DateT>(today)

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure()

  const [inscriptionToDelete, setInscriptionToDelete] = useState("")
  const [deleting, setDeleting] = useState(false)

  const handleBackDay = () => {
    const newDay = new Date(day.year, day.month, day.day - 1)
    setDay({
      day: newDay.getDate(),
      month: newDay.getMonth(),
      year: newDay.getFullYear(),
      weekday: newDay.getDay(),
      dateString: `${WeekDay[newDay.getDay()]}. ${newDay.getDate()}/${
        newDay.getMonth() + 1
      }/${newDay.getFullYear()}`,
    })
  }

  const handleNextDay = () => {
    const newDay = new Date(day.year, day.month, day.day + 1)
    setDay({
      day: newDay.getDate(),
      month: newDay.getMonth(),
      year: newDay.getFullYear(),
      weekday: newDay.getDay(),
      dateString: `${WeekDay[newDay.getDay()]}. ${newDay.getDate()}/${
        newDay.getMonth() + 1
      }/${newDay.getFullYear()}`,
    })
  }
  const onChangeDayValue = async () => {
    try {
      await getInscriptions(user?._id as string, day)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleModal = (_id: string) => {
    setInscriptionToDelete(_id)
    onOpen()
  }

  const onDeleteInscription = async () => {
    setDeleting(true)
    try {
      await deleteInscription(inscriptionToDelete)
      await getInscriptions(user?._id as string, day)
      onClose()
    } catch (error: any) {
      toast.error(error.message)
    }
    setDeleting(false)
  }

  const fetchData = async () => {
    try {
      await getInscriptions(user?._id as string, today)
    } catch (error: any) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    onChangeDayValue()
  }, [day])

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <ScreenLoader />

  return (
    <Screen>
      <Title>Inscripciones</Title>
      <Subtitle>
        Visuzalizarás las clases reservadas y podrás cancelar la que desees
      </Subtitle>
      <Book
        inscriptions={inscriptions}
        day={day}
        handleBackDay={handleBackDay}
        handleNextDay={handleNextDay}
        handleModal={handleModal}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            ¿Estás seguro que deseas cancelar tu inscripción a la clase?
          </ModalHeader>
          <ModalFooter>
            <Button onClick={onClose}>Atrás</Button>
            <Button isLoading={deleting} onClick={onDeleteInscription}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Screen>
  )
}

export default Inscriptions
