import { GetUsersQuery } from '@/src/shared/apolloClient/__generated__/graphql'
import { useEffect, useRef, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_USERS } from '@/src/features/user-list/api/request'
import { responseErrorHandler } from '@/src/shared'

export type Filter = 'userName' | 'date'

export const useUserList = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>('date')
  const originalUsersRef = useRef<GetUsersQuery['getUsers'] | undefined>(
    undefined
  )
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [users, setUsers] = useState<GetUsersQuery['getUsers']>()

  const [getUsers] = useLazyQuery(GET_USERS, {
    variables: {
      pageNumber: currentPage,
      pageSize,
    },
  })

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res?.data?.getUsers)
        originalUsersRef.current = res?.data?.getUsers
      })
      .catch((err) => {
        responseErrorHandler(err)
      })
  }, [currentPage, getUsers, pageSize])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onPageSize = (size: number) => {
    setPageSize(size)
  }

  const sortUsers = (
    filter: Filter = 'date',
    direction: 'asc' | 'desc' = 'desc'
  ) => {
    if (users?.users.length) {
      if (filter === 'userName') {
        const sortedItems = [...users.users].sort((a, b) => {
          return direction === 'asc'
            ? a.userName.localeCompare(b.userName)
            : b.userName.localeCompare(a.userName)
        })
        setUsers({ ...users, users: sortedItems })
      }

      if (filter === 'date') {
        const sortedItems = [...users.users].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime()
          const dateB = new Date(b.createdAt).getTime()

          return direction === 'desc' ? dateA - dateB : dateB - dateA
        })

        setUsers({ ...users, users: sortedItems })
      }
    }
    setActiveFilter(filter)
  }

  const filterUsers = (input: string, select?: 'blocked' | 'notBlocked') => {
    if (!originalUsersRef.current) return

    const filtered = originalUsersRef.current.users.filter((user) => {
      const matchesInput = user.userName
        .toLowerCase()
        .startsWith(input.toLowerCase())
      let matchesSelect = true

      if (select === 'blocked') {
        matchesSelect = user.userBan !== null
      }

      if (select === 'notBlocked') {
        matchesSelect = user.userBan === null
      }

      return matchesInput && matchesSelect
    })

    setUsers({ ...originalUsersRef.current, users: filtered })
  }

  return {
    sortUsers,
    activeFilter,
    users,
    onPageChange,
    onPageSize,
    currentPage,
    pageSize,
    filterUsers,
  }
}
