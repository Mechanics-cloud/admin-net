'use client'

import { useQuery } from '@apollo/client'
import NewUsersChart, { MonthStats } from './ui/NewUsersChart'
import { GET_USERS } from './api/request'
import { getDate } from './common/getCurrentAndPrevDate'

export default function Statistics() {
  const { data } = useQuery(GET_USERS)
  // console.dir(data)
  let newData = null
  if (data) {
    newData = getDate(data.getUsers.users) as MonthStats
    // console.log(newData)
  }

  return (
    <>
      <div>Statistics Page</div>
      {newData ? <NewUsersChart {...newData} /> : ''}
      {newData ? <NewUsersChart {...newData} /> : ''}
    </>
  )
}
