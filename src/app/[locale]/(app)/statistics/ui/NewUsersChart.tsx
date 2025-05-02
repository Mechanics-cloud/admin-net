// components/NewUsersChart.tsx
'use client'

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { Typography } from 'car-robots-library'

export type MonthStats = {
  number: string[]
  currentMonth: number[]
  prevMonth: number[]
}

export default function NewUsersChart(newData: MonthStats) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart>(null)

  console.log(newData)

  Chart.defaults.color = '#fff'
  Chart.defaults.font.size = 14
  Chart.defaults.font.family = 'Inter'

  useEffect(() => {
    if (chartRef.current) {
      // Уничтожаем предыдущий график если существует
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'line',

          data: {
            // labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '32'], //данные по x (числа)
            labels: newData.number, //данные по оси x (числа)
            datasets: [
              {
                // label: 'Number of New Users',
                data: newData.currentMonth,
                // data: [
                //   2000, 2500, 1900, 2300, 500, 2000, 2700, 1900, 2300, 500, // поставлю кол-во юзеров
                // ],
                pointRadius: 0,
                tension: 0.4,
                borderColor: '#1294eb',
                borderWidth: 2,
              },
              {
                // label: 'Number of New Users',
                data: newData.prevMonth,
                // data: [500, 2000, 1500, 2300, 200, 500, 2000, 1500, 2300, 1500],
                pointRadius: 0,
                tension: 0.4,
                borderColor: '#68f1c1',
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              ///

              ///
              y: {
                ///

                afterUpdate(axis) {
                  console.log(axis)
                  axis.paddingTop = 0
                },
                ///
                offset: true,
                beginAtZero: true,
                ticks: {
                  padding: 20,
                  callback: function (value) {
                    return value
                    // return value + ' ' + 'xxx'
                  },
                },
              },
              x: {
                border: {
                  display: true,
                  width: 1,
                  color: '#4C4C4C',
                  z: 1,
                },
                // offset: true, // Добавляет отступ по краям
                // grid: {
                //   offset: true // Отступ для линий сетки
                // },
                min: 1,
                ticks: {
                  callback: function (value) {
                    let formattedValue = value
                    if (String(value).length < 2) {
                      formattedValue = '0' + value
                    }
                    return formattedValue
                  },
                },
              },
            },
            // layout: {
            //   padding: {
            //     left: 20 // Дополнительный отступ слева для всего графика
            //   }
            // }
          },
        })
      }
    }

    // Очистка при размонтировании
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [newData])

  return (
    <div className='p-6'>
      <div className='max-w-240 '>
        <div className={'flex place-content-between items-center'}>
          <Typography variant={'h1'}>New users</Typography>
          <div className='flex gap-23'>
            <div className='flex gap-3'>
              <div className='flex gap-2 items-center'>
                <div className='w-3 h-3 rounded-full bg-accent-700'></div>
                <Typography variant={'reg14'}>Last month</Typography>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='w-3 h-3 rounded-full bg-accent-100'></div>
                <Typography variant={'reg14'}>Current month</Typography>
              </div>
            </div>
            <div className='w-66 h-9 border border-amber-50'>календарь</div>
          </div>
        </div>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}
