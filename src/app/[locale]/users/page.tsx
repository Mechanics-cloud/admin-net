'use client'
import { Pagination, Select } from 'car-robots-library'
import { useTranslations } from 'next-intl'

export default function UsersPage() {
  const t = useTranslations('UsersPage')
  return (
    <div className={'text-light-100'}>
      <div className={'flex justify-between max-w-[972px]'}>
        <input
          type={'search'}
          placeholder={t('search')}
          className={
            'w-[644px] border border-dark-100 rounded-sm px-3 py-1.5 h-9'
          }
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
