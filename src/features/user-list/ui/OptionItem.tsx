'use client'
import { Typography } from 'car-robots-library'
import { Option, OptionItemSelect, useOptionItem } from '@/src/features'
import { User } from '@/src/shared/apolloClient/__generated__/graphql'
import * as React from 'react'
import { cn, Modal } from '@/src/shared'

type Props = {
  option: Option
  user: User
}
export const OptionItem = ({ option, user }: Props) => {
  const { onClick, isOpen, t, selectValue, loading, onConfirm, onValueChange } =
    useOptionItem(option, user.id)

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
          onConfirm={onConfirm}
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
