'use client'

import { useTranslations } from 'next-intl'
import { Card, Typography } from 'car-robots-library'
import LocaleSwitcher from '@/src/shared/components/localeSwither/LocaleSwitcher'
import { Link } from '@/src/i18n/navigation'

export default function HomePage() {
  const t = useTranslations('HomePage')

  return (
    <>
      <Card className={'mt-[60px]'}>
        <Typography variant={'h1'}>{t('title')}</Typography>
        <LocaleSwitcher />
      </Card>
      <Link
        href={'/getUser'}
        className='m-5 border p-2'
      >
        getUser
      </Link>
    </>
  )
}
