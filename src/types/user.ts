export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface User {
  id: number
  username: string
  phonenumber: string
  status: UserStatus
}

export interface NewUser {
  username: string
  phonenumber: string
  status: UserStatus
} 