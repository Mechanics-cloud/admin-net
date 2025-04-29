// components/NewUsersChart.tsx
'use client'

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

// const labels = Utils.months({count: 7});
// const data = {
//   labels: labels,
//   datasets: [{
//     label: 'My First Dataset',
//     data: [65, 59, 80, 81, 56, 55, 40],
//     fill: false,
//     borderColor: 'rgb(75, 192, 192)',
//     tension: 0.1
//   }]
// };

export default function NewUsersChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart>(null)

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
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '32'], //данные по x
            datasets: [
              {
                // label: 'Number of New Users',
                data: [
                  2000, 2500, 1900, 2300, 500, 2000, 2700, 1900, 2300, 500,
                ],
                pointRadius: 0,
                tension: 0.4,
                borderColor: '#1294eb',
                borderWidth: 2,
              },
              {
                // label: 'Number of New Users',
                data: [500, 2000, 1500, 2300, 200, 500, 2000, 1500, 2300, 1500],
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
              y: {
                beginAtZero: true,
                // ticks: {
                //   callback: function(value) {
                //     return value.toLocaleString()
                //   }
                // }
              },
            },
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
  }, [])

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <h1 className='text-2xl font-bold text-center mb-2 text-gray-500'>
        New Users
      </h1>
      <div>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}
