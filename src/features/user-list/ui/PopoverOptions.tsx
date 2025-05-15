import { BlockedIcon } from '@/src/assets/icons/outlineIcons/BlockedIcon'
import {
  MoreHorizontalOutline,
  PersonOutline,
  Typography,
} from 'car-robots-library'
import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

type Option = {
  id: number
  icon: ReactNode
  key: 'popover.deleteUser' | 'popover.ban' | 'popover.moreInfo'
}

const options: Option[] = [
  {
    id: 1,
    icon: (
      <PersonOutline
        width={24}
        height={24}
      />
    ),
    key: 'popover.deleteUser',
  },
  { id: 2, icon: <BlockedIcon />, key: 'popover.ban' },
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
export const PopoverOptions = () => {
  const t = useTranslations('UsersPage')

  return options.map((option) => (
    <div
      key={option.id}
      className={
        'flex items-center gap-3 mb-3 cursor-pointer hover:bg-dark-400 hover:text-accent-500'
      }
    >
      {option.icon}
      <Typography variant={'reg14'}>{t(option.key)}</Typography>
    </div>
  ))
}
