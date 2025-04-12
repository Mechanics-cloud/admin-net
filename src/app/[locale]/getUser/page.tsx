'use client'

import { CHECK_QUERY } from '@/src/apolloClient/request'
import { useQuery } from '@apollo/client'
import '@/src/app/globals.css'

//TODO тестовая страница (смотрел запросы)
export default function GetUser() {
  const { loading, data } = useQuery(CHECK_QUERY, { variables: { Id: 1686 } })

  console.log('GetUser', data)

  if (loading) {
    return <div>Loading...</div>
  }

  return <div className={''}>{`Hello ${data?.getUser.userName}`}</div>
}
