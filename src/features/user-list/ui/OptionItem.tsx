'use client'
import { Select, SelectItem, Typography } from 'car-robots-library'
import { Option } from '@/src/features/user-list/ui/data'
import { useToggle } from '@/src/shared/hooks/useToggle'
import { Modal } from '@/src/shared/components/modal/Modal'
import { useTranslations } from 'next-intl'
import { MouseEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/src/shared/apolloClient/__generated__/graphql'
import * as React from 'react'
import { cn } from '@/src/shared'

type Props = {
  option: Option
  user: User
}
export const OptionItem = ({ option, user }: Props) => {
  const { state: isOpen, toggle } = useToggle()
  const t = useTranslations('UsersPage')
  const router = useRouter()
  const [showButtons, setShowButtons] = useState(true)

  const onClick = (e: MouseEvent) => {
    if (option.key === 'popover.moreInfo') {
      router.push(`/profile/${user.id}`)
    }
    e.stopPropagation()
    toggle()
    setShowButtons(true)
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
          showButtons={showButtons}
          setShowButtons={setShowButtons}
          className={cn(!showButtons && 'min-h-[288px]')}
          isToggleBan={option.key === 'popover.ban'}
        >
          <Typography variant={'reg16'}>
            {option.modalText && t(option.modalText)} {user.userName}?
          </Typography>
          {!showButtons && option.key === 'popover.ban' && (
            <div className={'relative z-99 mt-4.5'}>
              <Select
                placeholder={t('modal.reason.placeholder')}
                className={'min-w-[234px] [&>button>span>p]:mt-0!'}
              >
                <SelectItem
                  value={'behavior'}
                  className={'z-80'}
                >
                  <Typography variant={'reg16'}>
                    {t('modal.reason.behavior')}
                  </Typography>
                </SelectItem>
                <SelectItem value={'advertising'}>
                  <Typography variant={'reg16'}>
                    {t('modal.reason.advertising')}
                  </Typography>
                </SelectItem>
                <SelectItem value={'another'}>
                  <Typography variant={'reg16'}>
                    {t('modal.reason.another')}
                  </Typography>
                </SelectItem>
              </Select>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}
