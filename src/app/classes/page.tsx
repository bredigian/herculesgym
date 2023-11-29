"use client"

import {
  Button,
  CircularProgress,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react"
import { useEffect, useState } from "react"

import { COLUMNS } from "@/constants/columns"
import { Class } from "@/types/classes.types"
import { Inscription } from "@/types/inscription.types"
import { Schedule } from "@/types/schedule.types"
import Screen from "@/components/Screen"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import { toast } from "sonner"
import { useAuthStore } from "@/store/auth"
import { useClassesStore } from "@/store/classes"
import { useDay } from "@/hooks/useDay"
import { useForm } from "react-hook-form"
import { useInscriptionsStore } from "@/store/inscriptions"

interface FormData {
  class: string
  schedule: string
}

const Classes = () => {
  const { classes, getClasses } = useClassesStore()
  const { inscriptions, getInscriptions, createInscription } =
    useInscriptionsStore()
  const { user } = useAuthStore()
  const { tomorrow } = useDay()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>()

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)

  const handleChangeSchedules = () => {
    setValue("schedule", "")
    if (!selectedClass) {
      setSchedules([])
      return
    }
    const day = selectedClass?.days?.find(
      (item) => item.weekday === tomorrow.weekday
    )
    if (day) setSchedules(day?.schedules)
  }

  useEffect(() => {
    handleChangeSchedules()
  }, [selectedClass])

  const fetchData = async () => {
    try {
      await getClasses(tomorrow)
      await getInscriptions(user?._id as string)
    } catch (error: any) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const onSubmit = async (formData: FormData) => {
    setSubmitting(true)
    const inscription: Inscription = {
      class: {
        _id: selectedClass?._id as string,
        value: selectedClass?.value as string,
        name: selectedClass?.name as string,
      },
      schedule: formData.schedule,
      date: tomorrow,
      user: {
        name: user?.name as string,
        username: user?.username as string,
        _id: user?._id,
      },
    }
    try {
      await createInscription(inscription)
      await getInscriptions(user?._id as string)
      reset()
    } catch (error: any) {
      toast.error(error.message)
    }
    setSubmitting(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Screen>
      <Title>Clases</Title>
      <Subtitle>
        Acá podrás reservar tu lugar para las clases del día{" "}
        <strong>{tomorrow.dateString}</strong>
      </Subtitle>
      {!loading ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-10"
        >
          <section className="flex flex-col w-full gap-6">
            <Select
              id="class"
              label="Clase"
              variant="flat"
              {...register("class", {
                required: {
                  value: true,
                  message: "Tenés que seleccionar una clase",
                },
                onChange: (e) => {
                  const selectedClass = classes?.find(
                    (item) => item.value === e.target.value
                  )
                  setSelectedClass(selectedClass as Class)
                },
              })}
              errorMessage={errors?.class?.message}
              isInvalid={!!errors?.class?.message}
            >
              {classes?.map((item) => {
                return (
                  <SelectItem key={item.value} value={item.value}>
                    {item.name}
                  </SelectItem>
                )
              })}
            </Select>
            <Select
              label="Horario"
              variant="flat"
              {...register("schedule", {
                required: {
                  value: true,
                  message: "Tenés que seleccionar un horario",
                },
              })}
              errorMessage={errors?.schedule?.message}
              isInvalid={!!errors?.schedule}
              isDisabled={schedules.length === 0}
              disabledKeys={inscriptions.map((item) => item.schedule)}
            >
              {schedules?.map((item) => {
                return (
                  <SelectItem key={item.value} value={item.value}>
                    {item.value}
                  </SelectItem>
                )
              })}
            </Select>
          </section>
          {inscriptions.length === 0 ? (
            <p className="text-sm">
              Todavía no estás inscripto en ninguna clase.
            </p>
          ) : (
            <Table removeWrapper aria-label="Inscriptions table">
              <TableHeader columns={COLUMNS}>
                {(column) => (
                  <TableColumn
                    className={`bg-purple-regular text-black font-bold ${
                      column.key === "class" ? "text-start" : "text-end"
                    }`}
                    key={column.key}
                    width={column.key === "class" ? "70%" : "30%"}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody>
                {inscriptions.map((item) => {
                  return (
                    <TableRow key={item._id}>
                      <TableCell>{item.class.name}</TableCell>
                      <TableCell className="text-end font-semibold">
                        {item.schedule}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
          <Button
            type="submit"
            className="bg-purple-bold self-center text-white"
            isLoading={submitting}
          >
            Confirmar
          </Button>
        </form>
      ) : (
        <section className="grid place-items-center w-full">
          <CircularProgress
            color="default"
            size="lg"
            aria-label="Loading Form ..."
          />
        </section>
      )}
    </Screen>
  )
}

export default Classes
