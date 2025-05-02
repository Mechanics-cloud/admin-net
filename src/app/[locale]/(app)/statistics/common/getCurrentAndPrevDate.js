// Получаем текущую дату для определения месяцев

export function getDate(data) {
  const now = new Date()
  const currentMonth = now.getMonth() // 3 (апрель)
  const currentYear = now.getFullYear() // 2025

  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1 // март
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear

  // Инициализируем объекты для месяцев
  const currentMonthData = {}
  const prevMonthData = {}

  // Заполняем объекты нулями для всех дней (1-31)
  for (let day = 1; day <= 31; day++) {
    currentMonthData[day] = 0
    prevMonthData[day] = 0
  }

  // Обрабатываем данные
  data.forEach((item) => {
    const date = new Date(item.createdAt)
    const day = date.getDate() // число месяца (1-31)
    const month = date.getMonth()
    const year = date.getFullYear()

    if (month === currentMonth && year === currentYear) {
      currentMonthData[day]++
    } else if (month === prevMonth && year === prevYear) {
      prevMonthData[day]++
    }
  })

  return {
    number: Object.keys(currentMonthData),
    currentMonth: Object.values(currentMonthData),
    prevMonth: Object.values(prevMonthData),
  }
  // Результат:
  // console.log('Текущий месяц:', currentMonthData);
  // console.log('Предыдущий месяц:', prevMonthData);
}
