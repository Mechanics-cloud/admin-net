'use client'

import * as React from 'react'
import { UserFilter, UsersTable } from '@/src/features/user-list/ui'
import { useUserList } from '@/src/features/user-list/model/useUserList'

export default function UsersPage() {
  const {
    users,
    currentPage,
    onPageChange,
    onPageSize,
    pageSize,
    sortUsers,
    filterUsers,
    totalCount,
  } = useUserList()

  return (
    <div className={'text-light-100 pt-12 pr-16'}>
      <UserFilter filterUsers={filterUsers} />
      <UsersTable
        users={users}
        toggleSort={sortUsers}
        pageData={{
          currentPage,
          onPageSize,
          onPageChange,
          pageSize,
          totalCount,
        }}
      />
    </div>
  )
}
