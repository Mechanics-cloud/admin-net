import { ChangeEvent } from 'react'
import { User } from '@/src/shared/apolloClient/__generated__/graphql'
import { Filter } from '@/src/shared/hooks/useSortData'

export interface UseUserList {
  users: User[]
  currentPage: number
  onPageChange: (page: number) => void
  onPageSize: (size: number) => void
  pageSize: number
  totalCount: number
  loading: boolean
  inputValue: string
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  selectValue: string | undefined
  onSelectChange: (value: 'blocked' | 'notBlocked') => void
  toggleBanUser: ({
    userId,
    action,
    reason,
  }: {
    userId: number
    action: 'ban' | 'unban'
    reason?: string
  }) => void
  filterUsers: (input: string, select?: 'blocked' | 'notBlocked') => void
  sortUsers: (filter: Filter, direction: 'asc' | 'desc') => void
}
