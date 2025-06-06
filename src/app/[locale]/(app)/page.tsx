'use client'

import * as React from 'react'
import { UserFilter, UsersTable } from '@/src/features/user-list/ui'
import { UserListProvider } from '@/src/features/user-list/model/useUserListContext'

export default function UsersPage() {
  return (
    <div className={'text-light-100 pt-12 pr-16'}>
      <UserListProvider>
        <UserFilter />
        <UsersTable />
      </UserListProvider>
    </div>
  )
}
