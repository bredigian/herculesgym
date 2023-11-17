"use client"

import {
  Button,
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

import { COLUMNS } from "@/constants/columns"
import Screen from "@/components/Screen"
import Subtitle from "@/components/Subtitle"
import Title from "@/components/Title"
import { useDay } from "@/hooks/useDay"

const Classes = () => {
  const items = [
    {
      name: "Strong",
      value: "strong",
    },
    {
      name: "CrossFit",
      value: "crossfit",
    },
    {
      name: "Functional",
      value: "functional",
    },
    {
      name: "Tabata",
      value: "tabata",
    },
  ]
  const hours = ["18:00", "19:00", "20:00", "21:00", "22:00"]
  const rows = []

  const { tomorrow } = useDay()

  return (
    <Screen>
      <Title>Clases</Title>
      <Subtitle>
        Acá podrás reservar tu lugar para las clases del día{" "}
        <strong>{tomorrow.dateString}</strong>
      </Subtitle>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.log("Formulario")
        }}
        className="w-full flex flex-col items-center gap-10"
      >
        <section className="flex flex-col w-full gap-6">
          <Select label="Clase" variant="flat">
            {items.map((item) => {
              return (
                <SelectItem key={item.value} value={item.value}>
                  {item.name}
                </SelectItem>
              )
            })}
          </Select>
          <Select label="Horario" variant="flat">
            {hours.map((hour) => {
              return (
                <SelectItem key={hour} value={hour}>
                  {hour}
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
        <Button type="submit" className="bg-purple-bold self-center text-white">
          Confirmar
        </Button>
      </form>
    </Screen>
  )
}

export default Classes
