'use client'

import { useQuery } from '@apollo/client'
import { GET_PAYMENTS, GET_POSTS, GET_USERS } from './api/request'
import { getImageSizeByMonth } from './common/getDateAndSize'
import { getCurrentUsersPaid } from './common/getCurrentUsersPaid'
import { getDate } from './common/getCurrentAndPrevDate'
import { useState } from 'react'
import { cn } from '@/src/shared'
import { Button, Typography } from 'car-robots-library'
import CustomChart from '@/src/widgets/chart/CustomChart'

export default function Statistics() {
  const [activeTab, setActiveTab] = useState<'users' | 'photos'>('users')
  const { data: dataUser } = useQuery(GET_USERS)
  const { data: dataPayments } = useQuery(GET_PAYMENTS)
  const { data: dataPhotos } = useQuery(GET_POSTS)

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
          <Typography variant={'h3'}>Users</Typography>
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
          <Typography variant={'h3'}>Photos</Typography>
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
