import { ReactNode } from 'react'
import { MoreHorizontalOutline, PersonOutline } from 'car-robots-library'
import { UnblockIcon } from '@/src/assets/icons/outlineIcons/UnblockIcon'
import { BlockedIcon } from '@/src/assets/icons/outlineIcons/BlockedIcon'

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
