import { Typography } from 'car-robots-library'
import { ToggleItem, UserPopover } from '@/src/features/user-list/ui'
import { cn, formatDate } from '@/src/shared'
import { BlockedIcon } from '@/src/assets/icons/outlineIcons/BlockedIcon'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { User } from '@/src/shared/apolloClient/__generated__/graphql'
import { Filter } from '../model/useUserFilter'

type Props = {
  users: User[] | undefined
  toggleSort: (filter: Filter, direction: 'asc' | 'desc') => void
}

export const UsersTable = ({ users, toggleSort }: Props) => {
  const t = useTranslations('UsersPage')

  return (
    <table className='w-full text-left'>
      <thead className='bg-dark-500 h-[48px]'>
        <tr className='px-6'>
          <th className='px-6'>
            <Typography variant={'bold14'}>{t('userId')}</Typography>
          </th>
          <th className='px-6'>
            <ToggleItem
              toggleSort={toggleSort}
              activeFilter={'userName'}
            >
              {t('userName')}
            </ToggleItem>
          </th>
          <th className='px-6'>
            <Typography variant={'bold14'}>{t('profileLink')}</Typography>
          </th>
          <th className='px-6'>
            <ToggleItem
              toggleSort={toggleSort}
              activeFilter={'date'}
            >
              {t('dateAdded')}
            </ToggleItem>
          </th>
          <th className='px-6'></th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr
            className='h-[48px] align-middle'
            key={user.id}
          >
            <td className='px-6'>
              <div
                className={cn(
                  'flex items-center gap-3',
                  !user.userBan && 'pl-9'
                )}
              >
                {user.userBan?.reason && <BlockedIcon />}
                {user.id}
              </div>
            </td>
            <td className='px-6'>{user.userName}</td>
            <td className='px-6'>
              <Link href={`/profile/${user.id}`}>{user.email}</Link>
            </td>
            <td className='px-6'>{formatDate(user.createdAt)}</td>
            <td className='px-6'>
              <UserPopover>Hello</UserPopover>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
