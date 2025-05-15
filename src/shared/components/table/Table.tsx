import { Typography } from 'car-robots-library'
import { ToggleItem } from '@/src/features/user-list'
import { Filter } from '@/src/features/user-list/model/useUserFilter'
import { ReactNode } from 'react'

export type Column<P> = {
  key: keyof P | string
  label: string
  sortable?: boolean
  render: (item: P) => ReactNode
}

type Props<T> = {
  toggleSort?: (filter: Filter, direction: 'asc' | 'desc') => void
  data: T[]
  columns: Column<T>[]
  children?: ReactNode
}

export const TableComp = <T,>({
  toggleSort,
  data,
  columns,
  children,
}: Props<T>) => {
  return (
    <table className='w-full text-left'>
      <thead className='bg-dark-500 h-[48px]'>
        <tr className='px-6'>
          {columns.map((col) => (
            <th
              key={col.key as string}
              className='px-6'
            >
              {col.sortable && toggleSort ? (
                <ToggleItem
                  toggleSort={toggleSort}
                  activeFilter={col.key as Filter}
                >
                  {col.label}
                </ToggleItem>
              ) : (
                <Typography variant='bold14'>{col.label}</Typography>
              )}
            </th>
          ))}
          <th className='px-6'></th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr
            className='h-[48px] align-middle'
            key={`${Date.now()}/${index}`}
          >
            {columns.map((col) => (
              <td
                key={col.key as string}
                className='px-6'
              >
                {col.render(item)}
              </td>
            ))}
            {children}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
