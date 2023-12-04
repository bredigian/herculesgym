import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"

import { COLUMNS } from "@/constants/columns"
import { Class } from "@/types/classes.types"
import { Date } from "@/types/date.types"
import { inscriptionIsOld } from "@/utils/fx/verify"

const AdminTableBook = ({ day, classes }: { day: Date; classes: Class[] }) => {
  return (
    <Table removeWrapper aria-label="Classes table">
      <TableHeader columns={COLUMNS}>
        {(column) => (
          <TableColumn
            className={`bg-purple-regular text-black font-bold uppercase text-xs ${
              column.key === "class" ? "text-start" : "text-end"
            }`}
            key={column.key}
            width={
              column.key === "hour" || column.key === "actions" ? "20%" : "60%"
            }
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {classes.map((item) => {
          return (
            <TableRow key={item._id}>
              <TableCell className="text-xs">{item?.name}</TableCell>
              <TableCell className="flex items-center gap-1 justify-end font-semibold text-xs">
                {item?.days &&
                  item.days[0].schedules.map((schedule) => {
                    // Podemos acceder al primer día ya que los horarios son los mismos para todos los días
                    const isOld = inscriptionIsOld(day, schedule.value)
                    return (
                      <span
                        className={isOld ? "opacity-25" : "opacity-100"}
                        key={schedule._id}
                      >
                        {schedule.value}
                      </span>
                    )
                  })}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default AdminTableBook
