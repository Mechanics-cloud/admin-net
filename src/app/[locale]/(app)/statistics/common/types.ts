export type DatedItem = {
  createdAt: string | Date
  __typename?: string
}

export type UsersPaid = {
  userId: number
} & DatedItem

export type UploadedPhotos = {
  images: { fileSize: number }[]
} & DatedItem

export type MonthlyStats = {
  number: string[]
  currentMonth: number[]
  prevMonth: number[]
}
