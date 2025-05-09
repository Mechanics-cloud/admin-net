'use client'

import notFound from '@/public/notFound.svg'

import Image from 'next/image'
import { Button, Typography } from 'car-robots-library'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/src/shared/translate/i18n/navigation'

export default function NotContent() {
  const t = useTranslations('Basic')
  const router = useRouter()
  const onBackHandler = () => {
    router.back()
  }

  return (
    <div
      className={
        'mt-20 lg:mt-40 flex flex-col gap-8 items-center justify-center'
      }
    >
      <Image
        alt={'404 image'}
        className={'opacity-90'}
        height={500}
        src={notFound}
        width={500}
      />
      <Typography
        className={'m-auto text-center font-normal'}
        variant={'h1'}
      >
        {t('notFoundTitle')}
      </Typography>
      <Button onClick={onBackHandler}>{t('pagination.goBack')}</Button>
    </div>
  )
}
