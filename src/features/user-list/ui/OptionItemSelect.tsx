import { Select, SelectItem, Typography } from 'car-robots-library'
import * as React from 'react'
import { useTranslations } from 'next-intl'

type Props = {
  selectValue: string
  onValueChange: (value: string) => void
  placeholder: string
}
export const OptionItemSelect = ({
  selectValue,
  onValueChange,
  placeholder,
}: Props) => {
  const t = useTranslations('UsersPage')
  return (
    <div className={'relative z-99 mt-4.5'}>
      <Select
        placeholder={placeholder}
        className={'min-w-[234px] [&>button>span>p]:mt-0!'}
        value={selectValue}
        onValueChange={onValueChange}
      >
        <SelectItem
          value={'Bad behavior'}
          className={'z-80'}
        >
          <Typography variant={'reg16'}>
            {t('modal.reason.behavior')}
          </Typography>
        </SelectItem>
        <SelectItem value={'Advertising placement'}>
          <Typography variant={'reg16'}>
            {t('modal.reason.advertising')}
          </Typography>
        </SelectItem>
        <SelectItem value={'Another reason'}>
          <Typography variant={'reg16'}>{t('modal.reason.another')}</Typography>
        </SelectItem>
      </Select>
    </div>
  )
}
