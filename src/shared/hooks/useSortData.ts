import { useState } from 'react'
import { User } from '@/src/shared/apolloClient/__generated__/graphql'

export type Filter = 'userName' | 'date'

export const useSortData = (
  users: User[],
  setUsers: (users: User[]) => void
) => {
  const [activeFilter, setActiveFilter] = useState<Filter>('date')

  const sortUsers = (
    filter: Filter = 'date',
    direction: 'asc' | 'desc' = 'desc'
  ) => {
    if (!users.length) return
    const sortedItems = [...users].sort((a, b) => {
      if (filter === 'date') {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()

        return direction === 'desc' ? dateA - dateB : dateB - dateA
      }

      if (filter === 'userName') {
        return direction === 'asc'
          ? a.userName.localeCompare(b.userName)
          : b.userName.localeCompare(a.userName)
      }

      return 0
    })
    setUsers(sortedItems)
    setActiveFilter(filter)
  }

  return { activeFilter, sortUsers }
}
