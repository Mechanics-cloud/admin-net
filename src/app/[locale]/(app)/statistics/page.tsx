'use client'

import { useQuery } from '@apollo/client'
import { GET_PAYMENTS, GET_POSTS, GET_USERS } from './api/request'
import { getImageSizeByMonth } from './common/getDateAndSize'
import { getCurrentUsersPaid } from './common/getCurrentUsersPaid'
import { getDate } from './common/getCurrentAndPrevDate'
import { useState } from 'react'
import { cn, responseErrorHandler } from '@/src/shared'
import { Button, Typography } from 'car-robots-library'
import CustomChart from '@/src/widgets/chart/CustomChart'
import { useTranslations } from 'next-intl'

export default function Statistics() {
  const [activeTab, setActiveTab] = useState<'users' | 'photos'>('users')
  const { data: dataUser, error: errorUsers } = useQuery(GET_USERS)
  const { data: dataPayments, error: errorPayments } = useQuery(GET_PAYMENTS)
  const { data: dataPhotos, error: errorPhotos } = useQuery(GET_POSTS)

  const t = useTranslations('StatisticsPage')

  if (errorUsers || errorPayments || errorPhotos) {
    const error = errorUsers || errorPayments || errorPhotos
    responseErrorHandler(error)
  }

  let datesUsers = null
  if (dataUser) {
    datesUsers = getDate(dataUser.getUsers.users)
  }

  let datesPayments = null
  if (dataPayments) {
    datesPayments = getCurrentUsersPaid(dataPayments.getPayments.items)
  }

  let datesPhotos = null
  if (dataPhotos) {
    datesPhotos = getImageSizeByMonth(dataPhotos.getPosts)
  }

  return (
    <div className='pt-10 pl-6'>
      <div className='flex mb-16 border-b-1! border-dark-100! max-w-240'>
        <Button
          variant={'text'}
          className={cn(
            `w-34 pb-2.5 text-dark-100 focus-within:outline-0 border-b-2 border-dark-100 ${
              activeTab === 'users' ? 'text-accent-700! border-accent-700!' : ''
            }`
          )}
          onClick={() => setActiveTab('users')}
        >
          <Typography variant={'h3'}>{t('users')}</Typography>
        </Button>
        <Button
          variant={'text'}
          className={cn(
            `w-34 pb-2.5 text-dark-100 focus-within:outline-0 border-b-2 border-dark-100 ${
              activeTab === 'photos'
                ? 'text-accent-700! border-accent-700!'
                : ''
            }`
          )}
          onClick={() => setActiveTab('photos')}
        >
          <Typography variant={'h3'}>{t('photos')}</Typography>
        </Button>
      </div>
      {datesUsers && activeTab === 'users' && (
        <CustomChart
          {...datesUsers}
          variant={'newUsers'}
        />
      )}
      {datesPayments && activeTab === 'users' && (
        <CustomChart
          {...datesPayments}
          variant={'paidAccounts'}
        />
      )}
      {datesPhotos && activeTab === 'photos' && (
        <CustomChart
          {...datesPhotos}
          variant={'uploadedPhotos'}
        />
      )}
    </div>
  )
}
