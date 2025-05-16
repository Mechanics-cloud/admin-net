import { cn, formatDate, Column, TableComp, PageData } from '@/src/shared'
import { BlockedIcon } from '@/src/assets/icons/outlineIcons/BlockedIcon'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { User } from '@/src/shared/apolloClient/__generated__/graphql'
import { Filter } from '../model/useUserList'
import { UserPopover, PopoverOptions } from '@/src/features/user-list'

type Props = {
  users: User[] | undefined
  toggleSort: (filter: Filter, direction: 'asc' | 'desc') => void
  pageData: PageData
}

export const UsersTable = ({ users, toggleSort, pageData }: Props) => {
  const t = useTranslations('UsersPage')

  const columns: Column<User>[] = [
    {
      label: t('userId'),
      key: 'userId',
      render: (user) => (
        <div className={cn('flex items-center gap-3', !user.userBan && 'pl-9')}>
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
      render: (user) => <Link href={`/profile/${user.id}`}>{user.email}</Link>,
    },
    {
      label: t('dateAdded'),
      key: 'date',
      sortable: true,
      render: (user) => formatDate(user.createdAt),
    },
  ]

  return (
    users && (
      <TableComp
        toggleSort={toggleSort}
        data={users}
        columns={columns}
        pageData={pageData}
      >
        <td className='px-6'>
          <UserPopover>
            <PopoverOptions />
          </UserPopover>
        </td>
      </TableComp>
    )
  )
}
