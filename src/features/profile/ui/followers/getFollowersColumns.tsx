import { cn, Column, formatDate } from '@/src/shared'
import { Follower } from '@/src/features'
import Link from 'next/link'

export const getFollowersColumns = (): Column<Follower>[] => [
  {
    label: 'userId',
    key: 'userId',
    render: (user) => (
      <div className={cn('flex items-center gap-3')}>{user.userId}</div>
    ),
  },
  {
    label: 'userName',
    key: 'userName',
    sortable: true,
    render: (user) => user.userName,
  },
  {
    label: 'profileLink',
    key: 'profileLink',
    render: (user) => (
      <Link href={`/profile/${user.userId}?tab=followers`}>
        {user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.userName}
      </Link>
    ),
  },
  {
    label: 'dateAdded',
    key: 'date',
    sortable: true,
    render: (user) => formatDate(user.createdAt),
  },
]
