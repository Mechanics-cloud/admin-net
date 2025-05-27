import { GetPaymentsByUserQuery } from '@/src/shared/apolloClient/__generated__/graphql'
import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'

import { responseErrorHandler, usePagination } from '@/src/shared'
import { GET_PAYMENTS } from '../api/request'

export const usePaymentsList = (userId: string) => {
  const [payments, setPayments] = useState<GetPaymentsByUserQuery>()
  const [totalCount, setTotalCount] = useState<number>(0)

  const { currentPage, pageSize, onPageSize, onPageChange } = usePagination()

  const [gePayments, { loading, data }] = useLazyQuery(GET_PAYMENTS, {
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
          setPayments(res.data)
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
