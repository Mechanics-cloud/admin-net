'use client'

import { MainPaths } from '@/src/shared'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const tabItems = [
  {
    title: 'Uploaded photos',
  },
  {
    title: 'payments',
  },
  {
    title: 'followers',
  },
  {
    title: 'following',
  },
]

export default function ProfileLayout({
  paramsId,
  children,
}: {
  // params: Promise<{ id: string }>
  children: ReactNode
  paramsId: string
}) {
  const pathname = usePathname()
  const router = useRouter()

  console.log('pathname', pathname)
  console.log('router', router)
  console.log('paramsId', paramsId)

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
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-10'>
          {tabItems.map((item) => {
            return (
              <div
                key={item.title}
                className='bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition cursor-pointer'
              >
                <h3
                  onClick={() => {
                    router.push(`${pathname}/${item.title}`)
                  }}
                  className='font-medium text-blue-800 uppercase'
                >
                  {item.title}
                </h3>
              </div>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-gray-200 my-6'></div>

      {children}
    </div>
  )
}
