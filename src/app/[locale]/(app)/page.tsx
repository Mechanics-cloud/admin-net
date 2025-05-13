'use client'
import { Pagination, Select, SelectItem } from 'car-robots-library'
import { useTranslations } from 'next-intl'
import { TextField } from '@/src/shared'
import { Typography } from 'car-robots-library'
import Link from 'next/link'
import { useState } from 'react'
import { BlockedIcon } from '@/src/assets/icons/outlineIcons/BlockedIcon'
import { ToggleItem } from '@/src/features/user-list/ui/ToggleItem'
import * as React from 'react'

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(8)
  const [totalItemsCount, setTotalItemsCount] = useState<number>(100)

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onPageSize = (size: number) => {
    setPageSize(size)
  }

  const t = useTranslations('UsersPage')
  return (
    <div className={'text-light-100 pt-12 pr-16'}>
      <div className={'flex gap-[94px]'}>
        <TextField
          type={'search'}
          label={''}
          placeholder={'Search'}
          className={'w-full'}
        />
        <Select
          placeholder={t('notSelected')}
          className={'min-w-[234px] [&>button>span>p]:mt-0!'}
        >
          <SelectItem value={t('blocked')}>
            <Typography variant={'reg16'}>Blocked</Typography>
          </SelectItem>
          <SelectItem value={t('notBlocked')}>
            <Typography variant={'reg16'}>Not Blocked</Typography>
          </SelectItem>
        </Select>
      </div>
      <table className='w-full text-left'>
        <thead className='bg-dark-500 h-[48px]'>
          <tr className='px-6'>
            <th className='px-6'>
              <Typography variant={'bold14'}>User ID</Typography>
            </th>
            <th className='px-6'>
              <ToggleItem>Username</ToggleItem>
            </th>
            <th className='px-6'>
              <Typography variant={'bold14'}>Profile link</Typography>
            </th>
            <th className='px-6'>
              <ToggleItem>Date added</ToggleItem>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='h-[48px] align-middle'>
            <td className='px-6'>
              <div className='flex items-center gap-3'>
                <BlockedIcon />
                21331QErQe21
              </div>
            </td>
            <td className='px-6'>Ivan Yakymenko</td>
            <td className='px-6'>
              <Link href='/profile'>Ivan.sr.yakimenko</Link>
            </td>
            <td className='px-6'>12.12.2022</td>
          </tr>

          <tr className='h-[48px] align-middle'>
            <td className='px-6'>
              <div className='flex items-center gap-3 pl-9'>21331QErQe22</div>
            </td>
            <td className='px-6'>Kirill Mikulich</td>
            <td className='px-6'>
              <Link href='/profile'>Kirill_Mikulich</Link>
            </td>
            <td className='px-6'>12.12.2022</td>
          </tr>
        </tbody>
      </table>
      <div className={'mt-9 custom-pagination'}>
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => onPageChange(page)}
          onPageSize={(pageSize) => onPageSize(pageSize)}
          pageSize={pageSize}
          totalItemsCount={totalItemsCount}
        />
      </div>
    </div>
  )
}
