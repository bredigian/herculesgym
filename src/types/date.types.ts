export enum WeekDay {
  Dom = 0,
  Lun = 1,
  Mar = 2,
  Mie = 3,
  Jue = 4,
  Vie = 5,
  Sab = 6,
}

export interface Date {
  day: number
  month: number
  year: number
  weekday: WeekDay
  dateString: string
}
