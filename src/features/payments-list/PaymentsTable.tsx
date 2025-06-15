'use client'

import { TableComp, TextField } from '@/src/shared'
import { Loader } from 'car-robots-library'
import { useTranslations } from 'next-intl'
import { useAllPaymentsList } from './useAllPaymentsList'
import { useGetAllPaymentsColumns } from './useGetAllPaymentsColumns'
import { ChangeEvent } from 'react'
import { SortDirection } from '@/src/shared/apolloClient/__generated__/graphql'

export const AllPaymentsListTable = () => {
  const t = useTranslations('UserProfile.paymentsTable')

  const {
    paymentsAll,
    onPageChange,
    onPageSize,
    currentPage,
    pageSize,
    totalCount,
    loading,
    inputValue,
    setInputValue,
    inputRef,
    setSortType,
    setSortDirection,
  } = useAllPaymentsList()

  const columns = useGetAllPaymentsColumns()

  const handlerChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handlerToggle = (param: string, sortDirection: SortDirection) => {
    setSortType(param)
    setSortDirection(sortDirection)
  }

  if (loading) return <Loader />

  return (
    <div className={'flex-col gap-[94px]'}>
      <TextField
        ref={inputRef}
        type={'search'}
        label={''}
        placeholder={'search'}
        className={'w-full'}
        value={inputValue}
        onChange={handlerChangeValue}
      />
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
        {t('noPaymentsText')}
      </TableComp>
    </div>
  )
}
