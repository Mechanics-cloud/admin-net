import { ReactNode } from 'react'
import { MoreHorizontalOutline, PersonOutline } from 'car-robots-library'
import { UnblockIcon, BlockedIcon } from '@/src/assets'
import { cn, Column, formatDate } from '@/src/shared'
import { User } from '@/src/shared/apolloClient/__generated__/graphql'
import Link from 'next/link'
import { PopoverOptions, UserPopover } from '@/src/features'
import { useTranslations } from 'next-intl'

export type Option = {
  id: number
  icon: ReactNode
  key:
    | 'popover.deleteUser'
    | 'popover.ban'
    | 'popover.moreInfo'
    | 'popover.unban'
  modalText?: 'modal.delete' | 'modal.ban' | 'modal.unban'
}

export const getOptions = (isBanned: boolean): Option[] => {
  return [
    {
      id: 1,
      icon: (
        <PersonOutline
          width={24}
          height={24}
        />
      ),
      key: 'popover.deleteUser',
      modalText: 'modal.delete',
    },
    {
      id: 2,
      icon: isBanned ? <UnblockIcon /> : <BlockedIcon />,
      key: isBanned ? 'popover.unban' : 'popover.ban',
      modalText: isBanned ? 'modal.unban' : 'modal.ban',
    },
    {
      id: 3,
      icon: (
        <MoreHorizontalOutline
          width={24}
          height={24}
        />
      ),
      key: 'popover.moreInfo',
    },
  ]
}

export const getColumns = (
  t: ReturnType<typeof useTranslations>
): Column<User>[] => {
  return [
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
}
