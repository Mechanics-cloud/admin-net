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
    totalCount,
    loading,
    inputValue,
    onInputChange,
    selectValue,
    onSelectChange,
    banUser,
  } = useUserList()

  return (
    <div className={'text-light-100 pt-12 pr-16'}>
      <UserFilter
        inputValue={inputValue}
        onInputChange={onInputChange}
        selectValue={selectValue}
        onSelectChange={onSelectChange}
      />
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
        banUser={banUser}
      />
    </div>
  )
}
