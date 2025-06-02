'use client'

import { useLazyQuery } from '@apollo/client'
import { GET_FOLLOWERS, Follower } from '@/src/features'
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

export default function FollowersTable({ userId }: Props) {
  const [users, setUsers] = useState<Follower[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const { currentPage, pageSize, onPageSize, onPageChange } = usePagination()
  const { sortUsers } = useSortData(users, setUsers)
  const t = useTranslations('UserProfile')

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
          loading,
          totalCount,
        }}
        isData={!!users.length}
      >
        {t('noFollowers')}
      </TableComp>
    </div>
  )
}
