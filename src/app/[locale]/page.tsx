'use client'

import { useTranslations } from 'next-intl'
import { Button, Card, Typography } from 'car-robots-library'
import LocaleSwitcher from '@/src/shared/components/localeSwither/LocaleSwitcher'
import { Link } from '@/src/shared/translate/i18n/navigation'

export default function HomePage() {
  const t = useTranslations('HomePage')

  return (
    <>
      <Card className={'mt-[60px]'}>
        <Typography variant={'h1'}>{t('title')}</Typography>
        <LocaleSwitcher />
        <p>Уменьшай экран</p>
        <div className={'bg-accent-100 md:bg-warning-500'}>1</div>
        <div className={'bg-accent-200 md:bg-white'}>2</div>
        <div className={'bg-accent-300 md:bg-warning-500 mb-6'}>3</div>
        <Button variant={'secondary'}>Click</Button>
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
