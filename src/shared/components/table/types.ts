import { ReactNode } from 'react'

export type Column<P> = {
  key: keyof P | string
  label: string
  sortable?: boolean
  render: (item: P) => ReactNode
}

export type PageData = {
  currentPage: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSize: (size: number) => void
  totalCount: number
  loading: boolean
}
