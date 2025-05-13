import { useState, ReactNode, MouseEvent } from 'react'
import { Typography } from 'car-robots-library'

type Props = {
  children: ReactNode
}

export const ToggleItem = ({ children }: Props) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const toggleSort = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'))
  }

  return (
    <div className='text-light-100 px-4 py-2 w-40 flex items-center justify-between cursor-pointer select-none'>
      <Typography variant='bold14'>{children}</Typography>
      <div className='flex flex-col ml-2'>
        <svg
          onClick={toggleSort}
          className={`w-2.5 h-2.5 mb-0.5 ${
            sortDirection === 'asc' ? 'fill-white' : 'fill-gray-600'
          } hover:fill-white`}
          viewBox='0 0 10 6'
          xmlns='http://www.w3.org/2000/svg'
        >
          <polygon points='0,6 5,0 10,6' />
        </svg>

        <svg
          onClick={toggleSort}
          className={`w-2.5 h-2.5 mt-0.5 ${
            sortDirection === 'desc' ? 'fill-white' : 'fill-gray-600'
          } hover:fill-white`}
          viewBox='0 0 10 6'
          xmlns='http://www.w3.org/2000/svg'
        >
          <polygon points='0,0 5,6 10,0' />
        </svg>
      </div>
    </div>
  )
}
