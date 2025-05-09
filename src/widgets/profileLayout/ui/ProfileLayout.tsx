'use client'

import { cn, MainPaths } from '@/src/shared'
import { usePathname, useRouter } from '@/src/shared/translate/i18n/navigation'
import { Button, Typography } from 'car-robots-library'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useGetUserProfile } from '../common/useGetUserProfile'
import Image from 'next/image'
import { tabItems } from '../common/helper'
import { ArrowBack } from '@/src/shared/assets/icons'
import { useTranslations } from 'next-intl'
import NotContent from '@/src/_pages/404/NotContent'

export default function ProfileLayout({
  paramsId,
  children,
}: {
  paramsId: string
  children: ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('UserProfile')

  const { fullName, linkUser, profileCreateDate, avatar, error } =
    useGetUserProfile(paramsId)

  console.log(avatar)

  const basePath = `/userProfile/${paramsId}`

  if (error) {
    return <NotContent />
  }

  return (
    <div className='ml-20 mt-20'>
      <div className='max-w-[972px] mx-auto'>
        <Link
          href={MainPaths.usersList}
          className='inline-flex items-center hover:text-accent-300! mb-6 gap-2'
        >
          <ArrowBack className='h-5 w-5' />
          <Typography variant={'reg14'}>{t('backToUserList')}</Typography>
        </Link>
        <div className='mb-8 flex gap-3'>
          <Image
            alt={'avatar'}
            className={'rounded-full lg:mr-4'}
            height={60}
            priority
            src={avatar}
            width={60}
          />
          <div className='flex-col'>
            <Typography variant={'h1'}>{fullName}</Typography>
            <Typography variant={'reg14'}>
              <Link
                href={`https://car-robot.ru/profile/${paramsId}`}
                target='_blank'
                rel='noopener noreferrer'
                className='underline hover:text-accent-300!'
              >
                {linkUser}
              </Link>
            </Typography>
          </div>
        </div>
        <div className='flex gap-25'>
          <div className='flex flex-col gap-1'>
            <Typography
              variant={'reg14'}
              className={'text-light-900'}
            >
              {t('userID')}:
            </Typography>
            <Typography variant={'reg16'}>{paramsId}</Typography>
          </div>
          <div className='flex flex-col gap-1'>
            <Typography
              variant={'reg14'}
              className={'text-light-900'}
            >
              {t('profileCreationDate')}:
            </Typography>
            <Typography variant={'reg16'}>{profileCreateDate}</Typography>
          </div>
        </div>
        <div>
          <div className='grid grid-cols-1 md:grid-cols-4 mt-10'>
            {tabItems.map((item) => {
              return (
                <Button
                  key={item.title}
                  variant={'text'}
                  onClick={() => {
                    router.replace(
                      item.href ? `${basePath}/${item.href}` : basePath
                    )
                  }}
                  className={cn(
                    `pb-2.5 text-dark-100 focus-within:outline-0 border-b-2 border-dark-100 ${
                      pathname === `${basePath}/${item.href}` ||
                      (pathname === basePath && item.href === '')
                        ? 'text-accent-700! border-accent-700!'
                        : ''
                    }`
                  )}
                >
                  {t(item.title)}
                </Button>
              )
            })}
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
