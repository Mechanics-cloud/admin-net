'use client'

import { useLazyQuery } from '@apollo/client'
import { Follower, GET_FOLLOWING } from '@/src/features'
import {
  getTabColumns,
  responseErrorHandler,
  TableComp,
  usePagination,
  useSortData,
} from '@/src/shared'
import { useEffect, useState } from 'react'
import { Loader } from 'car-robots-library'
import { useTranslations } from 'next-intl'

type Props = {
  userId: number
}

export default function FollowingTable({ userId }: Props) {
  const [users, setUsers] = useState<Follower[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const { currentPage, pageSize, onPageSize, onPageChange } = usePagination()
  const { sortUsers } = useSortData(users, setUsers)
  const t = useTranslations('UserProfile')

  const [getFollowing, { loading }] = useLazyQuery(GET_FOLLOWING)

  useEffect(() => {
    getFollowing({
      variables: {
        userId,
        pageNumber: currentPage,
        pageSize: pageSize,
      },
    })
      .then((res) => {
        if (res.data?.getFollowing.items) {
          setUsers(res.data.getFollowing.items)
          setTotalCount(res.data.getFollowing.totalCount)
        }
      })
      .catch((error) => responseErrorHandler(error))
  }, [getFollowing, userId, currentPage, pageSize])

  if (loading) return <Loader />

  return (
    <div className={'mt-9'}>
      <TableComp
        data={users}
        columns={getTabColumns(t)}
        toggleSort={sortUsers}
        pageData={{
          currentPage,
          pageSize,
          onPageChange,
          onPageSize,
          totalCount,
        }}
        isData={!!users.length}
      >
        {t('noFollowing')}
      </TableComp>
    </div>
  )
}
