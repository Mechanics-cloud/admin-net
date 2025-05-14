import { TextField } from '@/src/shared'
import { Select, SelectItem, Typography } from 'car-robots-library'
import * as React from 'react'
import { useTranslations } from 'next-intl'
import { ChangeEvent, useState } from 'react'

type Props = {
  filterUsers: (input: string) => void
}
export const UserFilter = ({ filterUsers }: Props) => {
  const t = useTranslations('UsersPage')
  const [value, setValue] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    filterUsers(e.currentTarget.value)
  }

  return (
    <div className={'flex gap-[94px]'}>
      <TextField
        type={'search'}
        label={''}
        placeholder={t('search')}
        className={'w-full'}
        value={value}
        onChange={onChange}
      />
      <Select
        placeholder={t('notSelected')}
        className={'min-w-[234px] [&>button>span>p]:mt-0!'}
      >
        <SelectItem value={t('blocked')}>
          <Typography variant={'reg16'}>{t('blocked')}</Typography>
        </SelectItem>
        <SelectItem value={t('notBlocked')}>
          <Typography variant={'reg16'}>{t('notBlocked')}</Typography>
        </SelectItem>
      </Select>
    </div>
  )
}
