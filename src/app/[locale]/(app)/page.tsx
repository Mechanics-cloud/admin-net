'use client'
import { Pagination, Select } from 'car-robots-library'
import { useTranslations } from 'next-intl'
import { TextField } from '@/src/shared'

export default function UsersPage() {
  const t = useTranslations('UsersPage')
  return (
    <div className={'text-light-100'}>
      <div className={'flex justify-between max-w-[972px]'}>
        <TextField
          type={'search'}
          label={''}
          placeholder={'Search'}
        />
        <Select
          placeholder={t('notSelected')}
          className={'min-w-[234px] h-9'}
        >
          children
        </Select>
      </div>
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
