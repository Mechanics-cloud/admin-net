import { useState, ReactNode, MouseEvent } from 'react'
import { Typography } from 'car-robots-library'
import { SortingArrow } from '@/src/features/user-list/ui/SortingArrow'
import { Filter } from '@/src/shared/hooks/useSortData'

type Props = {
  children: ReactNode
  toggleSort: (filter: Filter, direction: 'asc' | 'desc') => void
  activeFilter: Filter
}

export const ToggleItem = ({ children, toggleSort, activeFilter }: Props) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const onToggleSort = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    toggleSort(activeFilter, sortDirection)
    setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'))
  }

  return (
    <div className='text-light-100 w-40 flex items-center cursor-pointer select-none'>
      <Typography variant='bold14'>{children}</Typography>
      <div className='flex flex-col ml-2'>
        <SortingArrow
          direction={'asc'}
          active={sortDirection === 'asc'}
          onClick={onToggleSort}
        />
        <SortingArrow
          direction={'desc'}
          active={sortDirection === 'desc'}
          onClick={onToggleSort}
        />
      </div>
    </div>
  )
}
