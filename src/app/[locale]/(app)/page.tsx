'use client'
import { Pagination, Select, SelectItem } from 'car-robots-library'
import { useTranslations } from 'next-intl'
import { cn, TextField } from '@/src/shared'
import { Typography } from 'car-robots-library'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BlockedIcon } from '@/src/assets/icons/outlineIcons/BlockedIcon'
import { ToggleItem } from '@/src/features/user-list/ui/ToggleItem'
import * as React from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_USERS } from '@/src/features/user-list/api/request'
import { GetUsersQuery } from '@/src/shared/apolloClient/__generated__/graphql'

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const t = useTranslations('UsersPage')
  const [users, setUsers] = useState<GetUsersQuery['getUsers']>()

  const [getUsers] = useLazyQuery(GET_USERS, {
    variables: {
      pageNumber: currentPage,
      pageSize,
    },
  })

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res?.data?.getUsers))
      .catch((err) => {
        console.error(err)
      })
  }, [currentPage, getUsers, pageSize])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onPageSize = (size: number) => {
    setPageSize(size)
  }

  return (
    <div className={'text-light-100 pt-12 pr-16'}>
      <div className={'flex gap-[94px]'}>
        <TextField
          type={'search'}
          label={''}
          placeholder={t('search')}
          className={'w-full'}
        />
        <Select
          placeholder={t('notSelected')}
          className={'min-w-[234px] [&>button>span>p]:mt-0!'}
        >
          <SelectItem value={t('blocked')}>
            <Typography variant={'reg16'}>{t('blocked')}</Typography>
          </SelectItem>
          <SelectItem value={t('notBlocked')}>
            <Typography variant={'reg16'}>{t('notBlocked')}</Typography>
          </SelectItem>
        </Select>
      </div>
      <table className='w-full text-left'>
        <thead className='bg-dark-500 h-[48px]'>
          <tr className='px-6'>
            <th className='px-6'>
              <Typography variant={'bold14'}>{t('userId')}</Typography>
            </th>
            <th className='px-6'>
              <ToggleItem>{t('userName')}</ToggleItem>
            </th>
            <th className='px-6'>
              <Typography variant={'bold14'}>{t('profileLink')}</Typography>
            </th>
            <th className='px-6'>
              <ToggleItem>{t('dateAdded')}</ToggleItem>
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.users?.map((user) => (
            <tr
              className='h-[48px] align-middle'
              key={user.id}
            >
              <td className='px-6'>
                <div
                  className={cn(
                    'flex items-center gap-3',
                    !user.userBan && 'pl-9'
                  )}
                >
                  {user.userBan?.reason && <BlockedIcon />}
                  {user.id}
                </div>
              </td>
              <td className='px-6'>{user.userName}</td>
              <td className='px-6'>
                <Link href={`/profile/${user.id}`}>{user.email}</Link>
              </td>
              <td className='px-6'>{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={'mt-9 custom-pagination'}>
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          onPageSize={onPageSize}
          pageSize={pageSize}
          totalItemsCount={users?.pagination.totalCount || 100}
        />
      </div>
    </div>
  )
}
