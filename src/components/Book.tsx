import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

import { Button } from "@nextui-org/react"
import { Date } from "@/types/date.types"
import { Inscription } from "@/types/inscription.types"
import { IoCloseCircle } from "react-icons/io5"
import TableBook from "./TableBook"

const Book = ({
  inscriptions,
  day,
  handleBackDay,
  handleNextDay,
  handleModal,
}: {
  inscriptions: Inscription[]
  day: Date
  handleBackDay: () => void
  handleNextDay: () => void
  handleModal: (_id: string) => void
}) => {
  return (
    <section className="flex flex-col items-center gap-10 w-full">
      <div className="flex items-center justify-around w-full">
        <Button
          isIconOnly
          className="bg-purple-regular"
          aria-label="Change to back day"
          onClick={handleBackDay}
        >
          <BsChevronLeft className="text-purple-bold text-base" />
        </Button>
        <span className="text-purple-bold font-medium">{day.dateString}</span>
        <Button
          isIconOnly
          className="bg-purple-regular"
          aria-label="Change to next day"
          onClick={handleNextDay}
        >
          <BsChevronRight className="text-purple-bold text-base" />
        </Button>
      </div>
      {inscriptions.length === 0 ? (
        <p className="text-sm">Todavía no estás inscripto en ninguna clase.</p>
      ) : (
        <>
          <TableBook
            inscriptions={inscriptions}
            isDetailed={true}
            handleModal={handleModal}
            day={day}
          />
          <aside className="self-end pr-3">
            <div className="flex items-center gap-1">
              <span className="text-xs">Cancelar</span>
              <IoCloseCircle className="text-purple-bold text-base" />
            </div>
          </aside>
        </>
      )}
    </section>
  )
}

export default Book
