'use client'

import { MainPaths, responseErrorHandler } from '@/src/shared'
import { Loader, Skeleton, Typography } from 'car-robots-library'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useGetUserProfile } from '../common/useGetUserProfile'
import Image from 'next/image'
import { ArrowBack } from '@/src/shared/assets/icons'
import { useTranslations } from 'next-intl'
import NotContent from '@/src/_pages/404/NotContent'
import { ButtonsGroup } from './ButtonsGroup'

export default function ProfileLayout({
  paramsId,
  children,
}: {
  paramsId: string
  children: ReactNode
}) {
  const t = useTranslations('UserProfile')

  const { fullName, linkUser, profileCreateDate, avatar, error, loading } =
    useGetUserProfile(paramsId)

  if (error) {
    responseErrorHandler(error)
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
          {loading ? (
            <>
              <Skeleton className='h-15 w-15 rounded-full lg:mr-4' />
              <Loader />
            </>
          ) : (
            <Image
              alt={'avatar'}
              className={'rounded-full lg:mr-4'}
              height={60}
              priority
              src={avatar}
              width={60}
            />
          )}
          <div className='flex-col'>
            {loading ? (
              <>
                <Skeleton className='h-5 w-40 mb-1' />
                <Skeleton className='h-5 w-40' />
              </>
            ) : (
              <>
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
              </>
            )}
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
            {loading ? (
              <Skeleton className='h-5' />
            ) : (
              <Typography variant={'reg16'}>{profileCreateDate}</Typography>
            )}
          </div>
        </div>
        <div>
          <ButtonsGroup paramsId={paramsId} />
        </div>
        {children}
      </div>
    </div>
  )
}
