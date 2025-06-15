import { useEffect, useRef, useState } from 'react'
import { useLazyQuery } from '@apollo/client'

import { responseErrorHandler, usePagination } from '@/src/shared'
import { GET_ALL_PAYMENTS } from './request'
import { AllPaymentItems } from './types'
import { useDebounce } from './useDebounce'
import { SortDirection } from '@/src/shared/apolloClient/__generated__/graphql'

export const useAllPaymentsList = () => {
  const [paymentsAll, setPaymentsAll] = useState<AllPaymentItems>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>('')

  const [sortType, setSortType] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Desc
  )

  const inputRef = useRef<HTMLInputElement>(null)

  const { currentPage, pageSize, onPageSize, onPageChange } = usePagination()

  const inputValueDebounce = useDebounce(inputValue)

  const [getPayments, { loading }] = useLazyQuery(GET_ALL_PAYMENTS, {
    variables: {
      pageNumber: currentPage,
      pageSize,
      searchTerm: inputValueDebounce,
      sortBy: sortType,
      sortDirection: sortDirection,
    },
  })

  // if(inputValueDebounce.length > 0) inputRef.current.focus

  useEffect(() => {
    // if(inputValue.length > 0 && inputRef.current) {
    //   inputRef.current.onfocus()
    //   console.log(inputValue)
    // }

    // console.log('inputValueDebounce')
    // console.log(inputValue)
    console.log('sortType', sortType)
    console.log('sortDirection', sortDirection)
    getPayments()
      .then((res) => {
        if (res?.data?.getPayments) {
          setPaymentsAll(res.data.getPayments.items)
          setTotalCount(res.data.getPayments.totalCount)
        }
      })
      .catch(responseErrorHandler)
  }, [
    currentPage,
    getPayments,
    pageSize,
    inputValueDebounce,
    sortType,
    sortDirection,
  ])

  useEffect(() => {
    if (inputValue.length > 0 && inputRef.current) {
      inputRef.current.focus()
      console.log(inputValue)
    }
  }, [inputValue, paymentsAll])

  return {
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
  }
}
