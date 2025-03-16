import { useTranslations } from 'next-intl'
import React from 'react'
import LocaleSwitcher from '@/src/shared/components/localeSwither/LocaleSwitcher'

export default function HomePage() {
  const t = useTranslations('HomePage')
  return (
    <div>
      <h1>{t('title')}</h1>
      <LocaleSwitcher />
    </div>
  )
}
