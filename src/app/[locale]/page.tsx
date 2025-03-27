'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import LocaleSwitcher from '@/src/shared/components/localeSwither/LocaleSwitcher'
import { Card, Typography } from 'car-robots-library'

export default function HomePage() {
  const t = useTranslations('HomePage')
  return (
    <Card>
      <Typography variant={'h1'}>{t('title')}</Typography>
      <LocaleSwitcher />
    </Card>
  )
}
