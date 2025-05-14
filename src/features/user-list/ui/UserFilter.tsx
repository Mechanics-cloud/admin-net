import { TextField } from '@/src/shared'
import { Select, SelectItem, Typography } from 'car-robots-library'
import * as React from 'react'
import { useTranslations } from 'next-intl'

export const UserFilter = () => {
  const t = useTranslations('UsersPage')
  return (
    <div className={'flex gap-[94px]'}>
      <TextField
        type={'search'}
        label={''}
        placeholder={t('search')}
        className={'w-full'}
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
