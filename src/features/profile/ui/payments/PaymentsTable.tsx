'use client'

import { TableComp } from '@/src/shared'
import { usePaymentsList } from '@/src/features/profile'
import { Loader } from 'car-robots-library'
import { useGetFollowersColumns } from '@/src/features/profile'
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

  return (
    <div className={'mt-9'}>
      <TableComp
        data={payments}
        columns={columns}
        pageData={{
          currentPage,
          pageSize,
          onPageChange,
          onPageSize,
          totalCount,
        }}
        isData={!!payments.length}
      >
        {t('noPaymentsText')}
      </TableComp>
    </div>
  )
}
