'use client'

import { useQuery } from '@apollo/client'
import '@/src/app/globals.css'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { CHECK_QUERY } from './api/request'

//TODO тестовая страница (смотрел запросы)
export default function GetUser() {
  const t = useTranslations('HomePage')
  const { loading, data } = useQuery(CHECK_QUERY, { variables: { Id: 1686 } })

  useEffect(() => {
    if (data) {
      toast.success('loading...')
    }
  }, [data])

  console.log('GetUser', data)
  console.log('loading', loading)

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  return (
    <div className={'h-full'}>
      <div
        className={'mt-[60px]'}
      >{`${t('title')} ${data?.getUser.userName}`}</div>
    </div>
  )
}
