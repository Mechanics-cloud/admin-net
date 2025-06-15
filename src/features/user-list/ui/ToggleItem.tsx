'use client'

import { useState, ReactNode, MouseEvent } from 'react'
import { Typography } from 'car-robots-library'
import { SortingArrow } from '@/src/assets'
import { Filter } from '@/src/shared'
import { SortDirection } from '@/src/shared/apolloClient/__generated__/graphql'

type Props = {
  children: ReactNode
  toggleSort: (filter: Filter, direction: SortDirection) => void
  activeFilter: Filter
}

export const ToggleItem = ({ children, toggleSort, activeFilter }: Props) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Desc
  )

  const onToggleSort = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    toggleSort(activeFilter, sortDirection)
    setSortDirection((prev) =>
      prev === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc
    )
  }

  return (
    <div
      onClick={onToggleSort}
      className='text-light-100 w-40 flex items-center cursor-pointer select-none'
    >
      <Typography variant='bold14'>{children}</Typography>
      <div className='flex flex-col ml-2'>
        <SortingArrow
          direction={'asc'}
          active={sortDirection === SortDirection.Asc}
          // onClick={onToggleSort}
        />
        <SortingArrow
          direction={'desc'}
          active={sortDirection === SortDirection.Desc}
          // onClick={onToggleSort}
        />
      </div>
    </div>
  )
}
