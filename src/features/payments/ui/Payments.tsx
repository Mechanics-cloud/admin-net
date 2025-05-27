'use client'

import * as React from 'react'
import { UsersTable } from '@/src/features/user-list/ui'
import { useUserList } from '@/src/features/user-list/model/useUserList'

export function Payments() {
  const {
    users,
    currentPage,
    onPageChange,
    onPageSize,
    pageSize,
    sortUsers,
    totalCount,
    loading,
  } = useUserList()

  return (
    <div className={'text-light-100 pt-12 pr-16'}>
      <UsersTable
        users={users}
        toggleSort={sortUsers}
        pageData={{
          currentPage,
          onPageSize,
          onPageChange,
          pageSize,
          totalCount,
          loading,
        }}
      />
    </div>
  )
}
