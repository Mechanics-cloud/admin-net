'use client'

import { useLazyQuery } from '@apollo/client'
import { GET_FOLLOWERS, Follower } from '@/src/features'
import {
  responseErrorHandler,
  TableComp,
  usePagination,
  useSortData,
} from '@/src/shared'
import { useEffect, useState } from 'react'
import { getFollowersColumns } from './getFollowersColumns'
import { Loader, Typography } from 'car-robots-library'

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

  if (loading) return <Loader />

  return users && users.length ? (
    <TableComp
      data={users}
      columns={getFollowersColumns()}
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
  ) : (
    <Typography variant={'bold16'}>This user has no followers</Typography>
  )
}
