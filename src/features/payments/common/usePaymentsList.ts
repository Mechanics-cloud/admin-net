import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'

import { responseErrorHandler, usePagination } from '@/src/shared'
import { GET_PAYMENTS } from '../api/request'
import { PaymentItems } from './type'

export const usePaymentsList = (userId: string) => {
  const [payments, setPayments] = useState<PaymentItems>()
  const [totalCount, setTotalCount] = useState<number>(0)

  const { currentPage, pageSize, onPageSize, onPageChange } = usePagination()

  const [gePayments, { loading }] = useLazyQuery(GET_PAYMENTS, {
    variables: {
      pageNumber: currentPage,
      pageSize,
      Id: +userId,
    },
  })

  useEffect(() => {
    gePayments()
      .then((res) => {
        if (res?.data?.getPaymentsByUser) {
          setPayments(res.data.getPaymentsByUser.items)
          setTotalCount(res.data.getPaymentsByUser.totalCount)
        }
      })
      .catch((err) => {
        responseErrorHandler(err)
      })
  }, [currentPage, gePayments, pageSize])

  return {
    payments,
    onPageChange,
    onPageSize,
    currentPage,
    pageSize,
    totalCount,
    loading,
  }
}
