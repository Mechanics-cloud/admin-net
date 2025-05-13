'use client'
import { Pagination, Select } from 'car-robots-library'
import { useTranslations } from 'next-intl'
import { TextField } from '@/src/shared'
import { Typography } from 'car-robots-library'
import Link from 'next/link'

export default function UsersPage() {
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
          className={'min-w-[234px] h-9'}
        >
          children
        </Select>
      </div>
      <table className='w-full text-left'>
        <thead className='bg-dark-500 h-[48px]'>
          <tr className='px-6'>
            <th className='px-6'>
              <Typography variant={'bold14'}>User ID</Typography>
            </th>
            <th className='px-6'>
              <Typography variant={'bold14'}>Username</Typography>
            </th>
            <th className='px-6'>
              <Typography variant={'bold14'}>Profile link</Typography>
            </th>
            <th className='px-6'>
              <Typography variant={'bold14'}>Date added</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className=' h-[48px]'>
            <td className='px-6'>21331QErQe21</td>
            <td className='px-6'>Ivan Yakymenko</td>
            <td className='px-6'>
              <Link href='/profile'>Ivan.sr.yakimenko</Link>
            </td>
            <td className='px-6'>12.12.2022</td>
          </tr>
        </tbody>
      </table>
      <div className={'mt-9 custom-pagination'}>
        <Pagination
          currentPage={1}
          onPageChange={() => {}}
          onPageSize={() => {}}
          pageSize={8}
          totalItemsCount={100}
        />
      </div>
    </div>
  )
}
