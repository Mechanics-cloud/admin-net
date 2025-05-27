'use client'
import { Typography } from 'car-robots-library'
import {
  Option,
  OptionItemSelect,
  useUserListContext,
  BAN_USER,
  UNBAN_USER,
} from '@/src/features'
import { useTranslations } from 'next-intl'
import { MouseEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/src/shared/apolloClient/__generated__/graphql'
import * as React from 'react'
import { cn, responseErrorHandler, useToggle, Modal } from '@/src/shared'
import { useMutation } from '@apollo/client'

type Props = {
  option: Option
  user: User
}
export const OptionItem = ({ option, user }: Props) => {
  const { state: isOpen, toggle } = useToggle()
  const t = useTranslations('UsersPage')
  const router = useRouter()

  const { toggleBanUser } = useUserListContext()

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

  const [banUserById, { loading }] = useMutation(BAN_USER, {
    variables: {
      userId: user.id,
      banReason: selectValue,
    },
    onError: (error) => {
      setSelectValue('')
      responseErrorHandler(error)
    },
  })

  const [unbanUserById] = useMutation(UNBAN_USER, {
    variables: {
      userId: user.id,
    },
    onError: (error) => {
      responseErrorHandler(error)
    },
  })

  const toggleBan = async () => {
    const action = option.key === 'popover.ban' ? 'ban' : 'unban'
    const reason = action === 'ban' ? selectValue : ''

    if (action === 'ban') {
      await banUserById()
      setSelectValue('')
    } else {
      await unbanUserById()
    }
    toggleBanUser({ userId: user.id, action, reason })
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
          disabled={(option.key === 'popover.ban' && !selectValue) || loading}
          onConfirm={toggleBan}
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
