import {
  GetUsersQuery,
  User,
} from '@/src/shared/apolloClient/__generated__/graphql'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
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

  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState<
    'blocked' | 'notBlocked' | undefined
  >(undefined)

  const [getUsers, { loading }] = useLazyQuery(GET_USERS, {
    variables: {
      pageNumber: currentPage,
      pageSize,
    },
  })

  useEffect(() => {
    getUsers()
      .then((res) => {
        if (res?.data?.getUsers.users) {
          originalUsersRef.current = res?.data?.getUsers
          if (selectValue || inputValue) {
            filterUsers(inputValue, selectValue)
          } else {
            setUsers(res?.data?.getUsers.users)
          }

          setTotalCount(res.data.getUsers.pagination.totalCount)
        }
      })
      .catch((err) => {
        responseErrorHandler(err)
      })
  }, [currentPage, getUsers, inputValue, pageSize, selectValue])

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

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    filterUsers(e.currentTarget.value, selectValue)
  }

  const onSelectChange = (value: 'blocked' | 'notBlocked') => {
    setSelectValue(value)
    filterUsers(inputValue, value)
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
    loading,
    inputValue,
    selectValue,
    onInputChange,
    onSelectChange,
  }
}
