import { useEffect, useRef, useState } from 'react'
import { useLazyQuery } from '@apollo/client'

import { responseErrorHandler, useDebounce, usePagination } from '@/src/shared'
import { GET_ALL_PAYMENTS } from '@/src/features/payments-list'
import { AllPaymentItems } from './types'
import { SortDirection } from '@/src/shared/apolloClient/__generated__/graphql'

export const useAllPaymentsList = () => {
  const [payments, setPayments] = useState<AllPaymentItems>([])
  const [totalPaymentsCount, setTotalPaymentsCount] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const [sortField, setSortField] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Desc
  )

  const inputRef = useRef<HTMLInputElement>(null)

  const { currentPage, pageSize, onPageSize, onPageChange } = usePagination()

  const inputValueDebounce = useDebounce(searchQuery)

  const [getPayments, { loading }] = useLazyQuery(GET_ALL_PAYMENTS, {
    variables: {
      pageNumber: currentPage,
      pageSize,
      searchTerm: inputValueDebounce,
      sortBy: sortField,
      sortDirection: sortDirection,
    },
  })

  useEffect(() => {
    getPayments()
      .then((res) => {
        if (res?.data?.getPayments) {
          setPayments(res.data.getPayments.items)
          setTotalPaymentsCount(res.data.getPayments.totalCount)
        }
      })
      .catch(responseErrorHandler)
  }, [
    currentPage,
    getPayments,
    pageSize,
    inputValueDebounce,
    sortField,
    sortDirection,
  ])

  useEffect(() => {
    if (searchQuery.length > 0 && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchQuery, payments])

  return {
    payments,
    onPageChange,
    onPageSize,
    currentPage,
    pageSize,
    totalCount: totalPaymentsCount,
    loading,
    searchQuery,
    setSearchQuery,
    inputRef,
    setSortField,
    setSortDirection,
  }
}
