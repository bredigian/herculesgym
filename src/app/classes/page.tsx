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

interface FormData {
  class: string
  schedule: string
}

const Classes = () => {
  const { classes, getClasses, registerClass } = useClassesStore()
  const { user } = useAuthStore()
  const { tomorrow } = useDay()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>()

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [schedules, setSchedules] = useState<Schedule[]>([])

  const handleChangeSchedules = (value: string) => {
    setValue("schedule", "")
    if (!value) {
      setSchedules([])
      return
    }
    const selectedClass = classes?.find((item) => item.value === value)
    const day = selectedClass?.days.find(
      (item) => item.weekday === tomorrow.weekday
    )
    if (day) setSchedules(day?.schedules)
  }

  const rows: any = []

  const fetchData = async () => {
    try {
      await getClasses(tomorrow)
    } catch (error: any) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const onSubmit = async (formData: FormData) => {
    setSubmitting(true)
    const inscription: Inscription = {
      class: formData.class,
      schedule: formData.schedule,
      date: tomorrow,
      user: {
        name: user?.name as string,
        username: user?.username as string,
      },
    }
    try {
      await registerClass(inscription)
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
                  handleChangeSchedules(e.target.value)
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
          {rows.length === 0 ? (
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
              <TableBody items={rows}>
                {(row) => (
                  <TableRow key={row.class}>
                    {(columnKey) => (
                      <TableCell
                        className={`${
                          columnKey === "class"
                            ? "text-start font-medium"
                            : "text-end font-semibold"
                        }`}
                      >
                        {getKeyValue(row, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
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
