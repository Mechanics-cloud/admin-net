export function getCurrentUsersPaid(data) {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear

  const currentMonthData = {}
  const prevMonthData = {}

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
      currentMonthData[day].add(userId)
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
