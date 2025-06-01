'use client'

import { TableComp } from '@/src/shared'
import { usePaymentsList } from '../common/usePaymentsList'
import { Loader, Typography } from 'car-robots-library'
import { useGetFollowersColumns } from '../common/useGetPaymensColumns'
import { useTranslations } from 'next-intl'

export const PaymentsTable = ({ userId }: { userId: string }) => {
  const t = useTranslations('UserProfile.paymentsTable')

  const {
    payments,
    onPageChange,
    onPageSize,
    currentPage,
    pageSize,
    totalCount,
    loading,
  } = usePaymentsList(userId)

  const columns = useGetFollowersColumns()

  if (loading) return <Loader />

  return payments && payments.length ? (
    <TableComp
      data={payments}
      columns={columns}
      pageData={{
        currentPage,
        pageSize,
        onPageChange,
        onPageSize,
        totalCount,
        loading,
      }}
    />
  ) : (
    <Typography variant={'bold16'}>{t('noPaymentsText')}</Typography>
  )
}
