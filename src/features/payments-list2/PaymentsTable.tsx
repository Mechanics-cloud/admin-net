'use client'

import { TableComp, TextField } from '@/src/shared'
import { Loader } from 'car-robots-library'
import { useTranslations } from 'next-intl'
import { useAllPaymentsList } from './useAllPaymentsList'
import { useGetAllPaymentsColumns } from './useGetAllPaymentsColumns'
import { ChangeEvent } from 'react'

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
  } = useAllPaymentsList()

  const columns = useGetAllPaymentsColumns()

  const handlerChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    // console.log(e.target.value)
  }

  if (loading) return <Loader />

  return (
    <div className={'flex-col gap-[94px]'}>
      <TextField
        ref={inputRef}
        type={'search'}
        label={''}
        placeholder={t('noPaymentsText')}
        className={'w-full'}
        value={inputValue}
        onChange={handlerChangeValue}
      />
      <TableComp
        data={paymentsAll}
        columns={columns}
        pageData={{
          currentPage,
          pageSize,
          onPageChange,
          onPageSize,
          totalCount,
        }}
        // isData={!!paymentsAll.length}
        isData={true}
      >
        {t('noPaymentsText')}
      </TableComp>
    </div>
  )
}
