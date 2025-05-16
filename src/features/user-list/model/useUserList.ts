import {
  GetUsersQuery,
  User,
} from '@/src/shared/apolloClient/__generated__/graphql'
import { useEffect, useRef, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_USERS } from '@/src/features/user-list/api/request'
import { responseErrorHandler } from '@/src/shared'
import { usePagination } from '@/src/shared/hooks/usePagination'
import { useSortData } from '@/src/shared/hooks/useSortData'

export const useUserList = () => {
  const [users, setUsers] = useState<User[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)

  const { currentPage, pageSize, onPageSize, onPageChange } = usePagination()
  const { activeFilter, sortUsers } = useSortData(users, setUsers)
  const originalUsersRef = useRef<GetUsersQuery['getUsers'] | null>(null)

  const [getUsers] = useLazyQuery(GET_USERS, {
    variables: {
      pageNumber: currentPage,
      pageSize,
    },
  })

  useEffect(() => {
    getUsers()
      .then((res) => {
        if (res?.data?.getUsers.users) {
          setUsers(res?.data?.getUsers.users)
          originalUsersRef.current = res?.data?.getUsers
          setTotalCount(res.data.getUsers.pagination.totalCount)
        }
      })
      .catch((err) => {
        responseErrorHandler(err)
      })
  }, [currentPage, getUsers, pageSize])

  const filterUsers = (input: string, select?: 'blocked' | 'notBlocked') => {
    if (!originalUsersRef.current) return

    const filteredUsers = originalUsersRef.current.users.filter((user) => {
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

    setUsers(filteredUsers)
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
    totalCount,
  }
}
