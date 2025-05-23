import { cn, formatDate, Column, TableComp } from '@/src/shared'
import { BlockedIcon } from '@/src/assets/icons/outlineIcons/BlockedIcon'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { User } from '@/src/shared/apolloClient/__generated__/graphql'
import { UserPopover, PopoverOptions } from '@/src/features/user-list'
import { useMemo } from 'react'
import { useUserListContext } from '@/src/features/user-list/model/useUserListContext'

export const UsersTable = () => {
  const t = useTranslations('UsersPage')
  const {
    users,
    sortUsers,
    currentPage,
    pageSize,
    onPageChange,
    onPageSize,
    totalCount,
    loading,
  } = useUserListContext()

  const columns = useMemo((): Column<User>[] => {
    return [
      {
        label: t('userId'),
        key: 'userId',
        render: (user) => (
          <div
            className={cn('flex items-center gap-3', !user.userBan && 'pl-9')}
          >
            {user.userBan?.reason && <BlockedIcon />}
            {user.id}
          </div>
        ),
      },
      {
        label: t('userName'),
        key: 'userName',
        sortable: true,
        render: (user) => user.userName,
      },
      {
        label: t('profileLink'),
        key: 'profileLink',
        render: (user) => (
          <Link href={`/profile/${user.id}`}>{user.email}</Link>
        ),
      },
      {
        label: t('dateAdded'),
        key: 'date',
        sortable: true,
        render: (user) => formatDate(user.createdAt),
      },
      {
        label: '',
        key: 'more',
        render: (user) => (
          <UserPopover>
            <PopoverOptions
              isBanned={!!user.userBan}
              user={user}
            />
          </UserPopover>
        ),
      },
    ]
  }, [t])

  return (
    users && (
      <TableComp
        toggleSort={sortUsers}
        data={users}
        columns={columns}
        pageData={{
          currentPage,
          pageSize,
          onPageChange,
          onPageSize,
          totalCount,
          loading,
        }}
      />
    )
  )
}
