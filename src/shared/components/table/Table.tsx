import { Pagination, Typography } from 'car-robots-library'
import { ToggleItem } from '@/src/features/user-list'
import { Filter } from '@/src/features/user-list/model/useUserList'
import { ReactNode } from 'react'
import * as React from 'react'
import { Column, PageData } from '@/src/shared'

type Props<T> = {
  toggleSort?: (filter: Filter, direction: 'asc' | 'desc') => void
  data: T[]
  columns: Column<T>[]
  children?: ReactNode
  pageData: PageData
}

export const TableComp = <T,>({
  toggleSort,
  data,
  columns,
  children,
  pageData,
}: Props<T>) => {
  const { currentPage, totalCount, pageSize, onPageChange, onPageSize } =
    pageData
  return (
    <>
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
      <div className={'mt-9 custom-pagination'}>
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          onPageSize={onPageSize}
          pageSize={pageSize}
          totalItemsCount={totalCount}
        />
      </div>
    </>
  )
}
