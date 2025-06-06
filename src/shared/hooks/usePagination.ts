import { useState } from 'react'

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(8)

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onPageSize = (size: number) => {
    setPageSize(size)
  }

  return { currentPage, pageSize, onPageChange, onPageSize }
}
