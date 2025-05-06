'use client'

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { DatePickerWithRange, Typography } from 'car-robots-library'
import { useTranslations } from 'next-intl'

type variant = 'newUsers' | 'paidAccounts' | 'uploadedPhotos'

export type MonthStats = {
  number: string[]
  currentMonth: number[]
  prevMonth: number[]
  variant: variant
}

export const variantsChart = {
  newUsers: {
    colorPrevMonth: ['bg-accent-900', '#234E99'],
    colorCurrentMonth: ['bg-accent-100', '#73A5FF'],
  },
  paidAccounts: {
    colorPrevMonth: ['bg-warning-900', '#664400'],
    colorCurrentMonth: ['bg-warning-100', '#FFD073'],
  },
  uploadedPhotos: {
    colorPrevMonth: ['bg-success-900', '#0A6638'],
    colorCurrentMonth: ['bg-success-100', '#80FFBF'],
  },
}

export default function CustomChart({
  number,
  currentMonth,
  prevMonth,
  variant,
}: MonthStats) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart>(null)

  const t = useTranslations('StatisticsPage')

  Chart.defaults.color = '#fff'
  Chart.defaults.font.size = 14
  Chart.defaults.font.family = 'Inter'

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'line',

          data: {
            labels: number,
            datasets: [
              {
                data: currentMonth,
                pointRadius: 0,
                tension: 0.4,
                borderColor: variantsChart[variant].colorCurrentMonth[1],
                borderWidth: 2,
              },
              {
                data: prevMonth,
                pointRadius: 0,
                tension: 0.4,
                borderColor: variantsChart[variant].colorPrevMonth[1],
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
                afterUpdate(axis) {
                  axis.paddingTop = 0
                },
                offset: true,
                beginAtZero: true,
                ticks: {
                  precision: 0,
                  padding: 20,
                  callback: function (value) {
                    if (variant === 'uploadedPhotos') {
                      return `${value} Mb`
                    }
                    return value
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
              },
            },
            layout: {
              padding: {
                bottom: 50,
              },
            },
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [number, currentMonth, prevMonth, variant])

  return (
    <div className='max-w-240 '>
      <div className={'flex place-content-between items-center'}>
        <Typography variant={'h1'}>{t(variant)}</Typography>
        <div className='flex gap-23 relative'>
          <div className='flex gap-5'>
            <div className='flex gap-2 items-center'>
              <div
                className={`w-3 h-3 rounded-full ${variantsChart[variant].colorPrevMonth[0]}`}
              ></div>
              <Typography variant={'reg14'}>{t('lastMonth')}</Typography>
            </div>
            <div className='flex gap-2 items-center'>
              <div
                className={`w-3 h-3 rounded-full ${variantsChart[variant].colorCurrentMonth[0]}`}
              ></div>
              <Typography variant={'reg14'}>{t('currentMonth')}</Typography>
            </div>
          </div>
          <div className='relative bottom-3'>
            <DatePickerWithRange
              label='Date range'
              disabled={false}
              mode='range'
            />
          </div>
        </div>
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  )
}
