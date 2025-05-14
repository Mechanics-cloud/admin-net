'use client'

import { Pagination } from 'car-robots-library'
import * as React from 'react'
import { UserFilter, UsersTable } from '@/src/features/user-list/ui'
import { useUserList } from '@/src/features/user-list/model/useUserFilter'

export default function UsersPage() {
  const {
    users,
    activeFilter,
    currentPage,
    onPageChange,
    onPageSize,
    pageSize,
    sortUsers,
    filterUsers,
  } = useUserList()
  console.log(activeFilter)

  return (
    <div className={'text-light-100 pt-12 pr-16'}>
      <UserFilter filterUsers={filterUsers} />
      <UsersTable
        users={users?.users}
        toggleSort={sortUsers}
      />
      <div className={'mt-9 custom-pagination'}>
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          onPageSize={onPageSize}
          pageSize={pageSize}
          totalItemsCount={users?.pagination.totalCount || 100}
        />
      </div>
    </div>
  )
}
