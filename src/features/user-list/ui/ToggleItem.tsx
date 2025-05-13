import { useState, ReactNode, MouseEvent } from 'react'
import { Typography } from 'car-robots-library'
import { SortingArrow } from '@/src/features/user-list/ui/SortingArrow'

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
    <div className='text-light-100 w-40 flex items-center justify-between cursor-pointer select-none'>
      <Typography variant='bold14'>{children}</Typography>
      <div className='flex flex-col ml-2'>
        <SortingArrow
          direction={'asc'}
          active={sortDirection === 'asc'}
          onClick={toggleSort}
        />
        <SortingArrow
          direction={'desc'}
          active={sortDirection === 'desc'}
          onClick={toggleSort}
        />
      </div>
    </div>
  )
}
