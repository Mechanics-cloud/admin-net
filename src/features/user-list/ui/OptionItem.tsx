'use client'
import { Typography } from 'car-robots-library'
import { Option } from '@/src/features/user-list/ui/data'
import { useToggle } from '@/src/shared/hooks/useToggle'
import { Modal } from '@/src/shared/components/modal/Modal'
import { useTranslations } from 'next-intl'
import { MouseEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/src/shared/apolloClient/__generated__/graphql'
import * as React from 'react'
import { cn } from '@/src/shared'
import { OptionItemSelect } from '@/src/features/user-list/ui/OptionItemSelect'
import { useMutation } from '@apollo/client'
import { BAN_USER } from '@/src/features/user-list/api/request'
import { useUserListContext } from '@/src/features/user-list/model/useUserListContext'

type Props = {
  option: Option
  user: User
}
export const OptionItem = ({ option, user }: Props) => {
  const { state: isOpen, toggle } = useToggle()
  const t = useTranslations('UsersPage')
  const router = useRouter()

  const { banUser } = useUserListContext()

  const onClick = (e: MouseEvent) => {
    if (option.key === 'popover.moreInfo') {
      router.push(`/profile/${user.id}`)
    }
    e.stopPropagation()
    toggle()
  }

  const [selectValue, setSelectValue] = useState<string>('')
  const onValueChange = (value: string) => {
    setSelectValue(value)
  }

  const [banUserById] = useMutation(BAN_USER, {
    variables: {
      userId: user.id,
      banReason: selectValue,
    },
  })

  const onBanUser = async () => {
    await banUserById()
    banUser(user.id, selectValue)
    setSelectValue('')
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
          className={cn(option.key === 'popover.ban' && 'min-h-[288px]')}
          disabled={!selectValue}
          onConfirm={onBanUser}
        >
          <Typography variant={'reg16'}>
            {option.modalText && t(option.modalText)} {user.userName}?
          </Typography>
          {option.key === 'popover.ban' && (
            <OptionItemSelect
              placeholder={t('modal.reason.placeholder')}
              selectValue={selectValue}
              onValueChange={onValueChange}
            />
          )}
        </Modal>
      )}
    </div>
  )
}
