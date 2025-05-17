'use client'
import { Typography } from 'car-robots-library'
import { Option } from '@/src/features/user-list/ui/data'
import { useToggle } from '@/src/shared/hooks/useToggle'
import { Modal } from '@/src/shared/components/modal/Modal'
import { useTranslations } from 'next-intl'
import { MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/src/shared/apolloClient/__generated__/graphql'

type Props = {
  option: Option
  user: User
}
export const OptionItem = ({ option, user }: Props) => {
  const { state: isOpen, toggle } = useToggle()
  const t = useTranslations('UsersPage')
  const router = useRouter()

  const onClick = (e: MouseEvent) => {
    if (option.key === 'popover.moreInfo') {
      router.push(`/profile/${user.id}`)
    }
    e.stopPropagation()
    toggle()
  }
  return (
    <div
      key={option.id}
      className={
        'flex items-center gap-3 mb-3 cursor-pointer hover:bg-dark-400 hover:text-accent-500'
      }
      onClick={onClick}
    >
      {option.icon}
      <Typography variant={'reg14'}>{t(option.key)}</Typography>
      {isOpen && option.key !== 'popover.moreInfo' && (
        <Modal
          close={onClick}
          title={t(option.key)}
        >
          {option.modalText && t(option.modalText)} {user.userName}?
        </Modal>
      )}
    </div>
  )
}
