'use client'

import { useLazyQuery } from '@apollo/client'
import { GET_FOLLOWERS, Follower } from '@/src/features'
import {
  cn,
  Column,
  formatDate,
  responseErrorHandler,
  TableComp,
  usePagination,
  useSortData,
} from '@/src/shared'
import { useEffect, useMemo, useState } from 'react'

type Props = {
  userId: number
}

export default function FollowersTable({ userId }: Props) {
  const [users, setUsers] = useState<Follower[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const { currentPage, pageSize, onPageSize, onPageChange } = usePagination()
  const { sortUsers } = useSortData(users, setUsers)

  const [getFollowers, { loading }] = useLazyQuery(GET_FOLLOWERS)

  useEffect(() => {
    getFollowers({
      variables: {
        userId,
        pageNumber: currentPage,
        pageSize: pageSize,
      },
    })
      .then((res) => {
        if (res.data?.getFollowers.items) {
          setUsers(res.data.getFollowers.items)
          setTotalCount(res.data.getFollowers.totalCount)
        }
      })
      .catch((error) => responseErrorHandler(error))
  }, [getFollowers, userId, currentPage, pageSize])

  const columns = useMemo((): Column<Follower>[] => {
    return [
      {
        label: 'userId',
        key: 'userId',
        render: (user) => (
          <div className={cn('flex items-center gap-3')}>{user.id}</div>
        ),
      },
      {
        label: 'userName',
        key: 'userName',
        sortable: true,
        render: (user) => user.userName,
      },
      {
        label: 'profileLink',
        key: 'profileLink',
        //todo: wrap into Link - to the user profile
        render: (user) =>
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.userName,
      },
      {
        label: 'dateAdded',
        key: 'date',
        sortable: true,
        render: (user) => formatDate(user.createdAt),
      },
    ]
  }, [])

  return (
    users && (
      <TableComp
        data={users}
        columns={columns}
        toggleSort={sortUsers}
        pageData={{
          currentPage,
          pageSize,
          onPageChange,
          onPageSize,
          loading,
          totalCount,
        }}
      />
    )
  )
}
