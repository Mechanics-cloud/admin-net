'use client'

import { TableComp, TextField } from '@/src/shared'
import { useTranslations } from 'next-intl'
import { useAllPaymentsList } from '@/src/features/payments-list'
import { useGetAllPaymentsColumns } from '@/src/features/payments-list'
import { ChangeEvent } from 'react'
import { SortDirection } from '@/src/shared/apolloClient/__generated__/graphql'
import { CircleLoader } from 'car-robots-library'

export const AllPaymentsListTable = () => {
  const usersTranslations = useTranslations('UsersPage')
  const paymentsListTranslation = useTranslations('PaymentsList')

  const {
    payments: paymentsAll,
    onPageChange,
    onPageSize,
    currentPage,
    pageSize,
    totalCount,
    loading,
    searchQuery,
    setSearchQuery,
    inputRef,
    setSortField,
    setSortDirection,
  } = useAllPaymentsList()

  const columns = useGetAllPaymentsColumns()

  const handlerChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handlerToggle = (param: string, sortDirection: SortDirection) => {
    setSortField(param)
    setSortDirection(sortDirection)
  }

  return (
    <div className={'flex-col gap-[94px]'}>
      <TextField
        ref={inputRef}
        type={'search'}
        label={''}
        placeholder={usersTranslations('search')}
        className={'w-full'}
        value={searchQuery}
        onChange={handlerChangeValue}
      />
      {loading ? (
        <CircleLoader
          className={'w-full h-[114px] flex justify-center items-center'}
        />
      ) : (
        <TableComp
          toggleSort={handlerToggle}
          data={paymentsAll}
          columns={columns}
          pageData={{
            currentPage,
            pageSize,
            onPageChange,
            onPageSize,
            totalCount,
          }}
          isData={!!paymentsAll.length}
        >
          {paymentsListTranslation('notFoundUser')}
        </TableComp>
      )}
    </div>
  )
}
