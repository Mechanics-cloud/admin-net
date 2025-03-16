import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import LocaleSwitcherSelect from './LocaleSwitcherSelect'
import { routing } from '@/src/i18n/routing'

export default function LocaleSwitcher() {
  const t = useTranslations('HomePage')
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      label={t('label')}
    >
      {routing.locales.map((current) => (
        <option
          key={current}
          value={current}
        >
          {t('locale', { locale: current ?? 'ru' })}
        </option>
      ))}
    </LocaleSwitcherSelect>
  )
}
