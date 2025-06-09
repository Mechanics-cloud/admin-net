import { DatedItem, MonthlyStats, UploadedPhotos, UsersPaid } from './types'

export function getDateForNewUsers(data: DatedItem[]): MonthlyStats {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear

  const currentMonthData: Record<string, number> = {}
  const prevMonthData: Record<string, number> = {}

  for (let day = 1; day <= 31; day++) {
    currentMonthData[day] = 0
    prevMonthData[day] = 0
  }

  data.forEach((item) => {
    const date = new Date(item.createdAt)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    if (month === currentMonth && year === currentYear) {
      currentMonthData[day]++
    } else if (month === prevMonth && year === prevYear) {
      prevMonthData[day]++
    }
  })

  return {
    number: Object.keys(currentMonthData).map((day) => day.padStart(2, '0')),
    currentMonth: Object.values(currentMonthData),
    prevMonth: Object.values(prevMonthData),
  }
}

export function getUsersPaid(data: UsersPaid[]): MonthlyStats {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear

  const currentMonthData: Record<number, Set<number>> = {}
  const prevMonthData: Record<number, Set<number>> = {}

  for (let day = 1; day <= 31; day++) {
    currentMonthData[day] = new Set()
    prevMonthData[day] = new Set()
  }

  data.forEach(({ createdAt, userId }) => {
    const date = new Date(createdAt)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    if (month === currentMonth && year === currentYear) {
      currentMonthData[day].add(userId!)
    } else if (month === prevMonth && year === prevYear) {
      prevMonthData[day].add(userId)
    }
  })

  return {
    number: Object.keys(currentMonthData).map((day) => day.padStart(2, '0')),
    currentMonth: Object.values(currentMonthData).map((set) => set.size),
    prevMonth: Object.values(prevMonthData).map((set) => set.size),
  }
}

export function getImageSizeByMonth(data: UploadedPhotos[]): MonthlyStats {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear

  const currentMonthData: Record<string, number> = {}
  const prevMonthData: Record<string, number> = {}

  for (let day = 1; day <= 31; day++) {
    currentMonthData[day] = 0
    prevMonthData[day] = 0
  }

  data.forEach((item) => {
    const date = new Date(item.createdAt)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const totalSize = item.images.reduce((sum, img) => sum + img.fileSize, 0)

    if (month === currentMonth && year === currentYear) {
      currentMonthData[day] += totalSize
    } else if (month === prevMonth && year === prevYear) {
      prevMonthData[day] += totalSize
    }
  })

  const bytesToMB = (bytes: number) =>
    parseFloat((bytes / (1024 * 1024)).toFixed(2))

  return {
    number: Object.keys(currentMonthData).map((day) => day.padStart(2, '0')),
    currentMonth: Object.values(currentMonthData).map(bytesToMB),
    prevMonth: Object.values(prevMonthData).map(bytesToMB),
  }
}
