import { TextField } from '@/src/shared'
import { Select, SelectItem, Typography } from 'car-robots-library'
import * as React from 'react'
import { useTranslations } from 'next-intl'
import { ChangeEvent, useState } from 'react'

type Props = {
  filterUsers: (input: string, select?: 'blocked' | 'notBlocked') => void
}
export const UserFilter = ({ filterUsers }: Props) => {
  const t = useTranslations('UsersPage')
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState<
    'blocked' | 'notBlocked' | undefined
  >(undefined)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    filterUsers(e.currentTarget.value, selectValue)
  }

  const onSelectChange = (value: 'blocked' | 'notBlocked') => {
    setSelectValue(value)
    filterUsers(inputValue, value)
  }

  return (
    <div className={'flex gap-[94px]'}>
      <TextField
        type={'search'}
        label={''}
        placeholder={t('search')}
        className={'w-full'}
        value={inputValue}
        onChange={onInputChange}
      />
      <Select
        placeholder={t('notSelected')}
        className={'min-w-[234px] [&>button>span>p]:mt-0!'}
        value={selectValue}
        onValueChange={(value) =>
          onSelectChange(value as 'blocked' | 'notBlocked')
        }
      >
        <SelectItem value={'blocked'}>
          <Typography variant={'reg16'}>{t('blocked')}</Typography>
        </SelectItem>
        <SelectItem value={'notBlocked'}>
          <Typography variant={'reg16'}>{t('notBlocked')}</Typography>
        </SelectItem>
      </Select>
    </div>
  )
}
