export enum UserRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  _id?: string
  name?: string
  username: string
  password?: string
  role: UserRoles
}
