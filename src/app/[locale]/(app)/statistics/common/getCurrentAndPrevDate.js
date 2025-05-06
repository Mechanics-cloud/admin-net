export function getDate(data) {
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
