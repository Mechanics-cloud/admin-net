'use client'

import { cn, MainPaths } from '@/src/shared'
import { usePathname, useRouter } from '@/src/shared/translate/i18n/navigation'
import { Button } from 'car-robots-library'
import Link from 'next/link'
import { ReactNode } from 'react'

const tabItems = [
  {
    title: 'Uploaded photos',
    href: ``,
  },
  {
    title: 'Payments',
    href: 'payments',
  },
  {
    title: 'Followers',
    href: 'followers',
  },
  {
    title: 'Following',
    href: 'following',
  },
]

export default function ProfileLayout({
  paramsId,
  children,
}: {
  paramsId: string
  children: ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const basePath = `/userProfile/${paramsId}`

  // console.log('pathname', pathname)
  // console.log('router', router)
  // console.log('paramsId', paramsId)

  return (
    <div className='max-w-[972px] mx-auto mt-20'>
      {/* Back link */}
      <Link
        href={MainPaths.usersList}
        className='inline-flex items-center text-blue-600 hover:text-blue-800 mb-6'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 mr-1'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
            clipRule='evenodd'
          />
        </svg>
        Back to Users List
      </Link>

      {/* User header */}
      <div className='mb-8 flex gap-3'>
        <div className='w-15 h-15 rounded-full bg-warning-300'></div>
        <div className='flex-col'>
          <h2 className=''>Ivan Yakimenko</h2>
          <p className=''>Ivan.sizyakimenko</p>
        </div>
      </div>

      {/* User ID and creation date */}
      <div className='flex gap-10'>
        <div className='flex flex-col'>
          <span className=''>UserID:</span>
          <span className=''>{paramsId}</span>
        </div>
        <div className='flex flex-col'>
          <span className=''>Profile Creation Date:</span>
          <span className=''>12.12.2022</span>
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
                {item.title}
              </Button>
            )
          })}
        </div>
      </div>
      {children}
    </div>
  )
}
