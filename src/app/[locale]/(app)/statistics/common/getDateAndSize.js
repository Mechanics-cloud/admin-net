export function getImageSizeByMonth(data) {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear

  const currentMonthData = {}
  const prevMonthData = {}

  for (let day = 1; day <= 31; day++) {
    currentMonthData[day] = 0
    prevMonthData[day] = 0
  }

  data.items.forEach((item) => {
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

  const bytesToMB = (bytes) => parseFloat((bytes / (1024 * 1024)).toFixed(2))

  return {
    number: Object.keys(currentMonthData),
    currentMonth: Object.values(currentMonthData).map(bytesToMB),
    prevMonth: Object.values(prevMonthData).map(bytesToMB),
  }
}
