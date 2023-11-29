import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"

import { COLUMNS } from "@/constants/columns"
import { Inscription } from "@/types/inscription.types"
import { IoCloseCircle } from "react-icons/io5"
import { type Date as DateT } from "@/types/date.types"
import { inscriptionIsOld } from "@/utils/fx/verify"

const TableBook = ({
  inscriptions,
  isDetailed,
  handleModal,
  day,
}: {
  inscriptions: Inscription[]
  isDetailed?: boolean
  handleModal?: (_id: string) => void
  day: DateT
}) => {
  return (
    <Table removeWrapper aria-label="Inscriptions table">
      <TableHeader
        columns={
          isDetailed
            ? [...COLUMNS, { key: "actions", name: "Acciones" }]
            : COLUMNS
        }
      >
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
        {inscriptions.map((item) => {
          const isOld = inscriptionIsOld(day, item.schedule)

          if (isDetailed) {
            return (
              <TableRow
                className={isOld ? "opacity-25" : "opacity-100"}
                key={item._id}
              >
                <TableCell className="text-xs">{item.class.name}</TableCell>
                <TableCell className="text-end font-semibold text-xs">
                  {item.schedule}
                </TableCell>
                <TableCell className="flex flex-col items-end">
                  <IoCloseCircle
                    onClick={
                      handleModal
                        ? !isOld
                          ? () => handleModal(item._id as string)
                          : null
                        : null
                    }
                    className="text-purple-bold text-lg"
                  />
                </TableCell>
              </TableRow>
            )
          } else {
            return (
              <TableRow key={item._id}>
                <TableCell className="text-xs">{item.class.name}</TableCell>
                <TableCell className="text-end font-semibold text-xs">
                  {item.schedule}
                </TableCell>
              </TableRow>
            )
          }
        })}
      </TableBody>
    </Table>
  )
}

export default TableBook
