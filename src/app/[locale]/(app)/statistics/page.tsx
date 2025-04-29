'use client'

import { useQuery } from '@apollo/client'
import NewUsersChart from './ui/NewUsersChart'
import { GET_USERS } from './api/request'

export default function Statistics() {
  const { data } = useQuery(GET_USERS)
  console.dir(data)

  return (
    <>
      <div>Statistics Page</div>
      <NewUsersChart />
    </>
  )
}
