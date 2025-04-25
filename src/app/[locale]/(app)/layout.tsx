'use client'

import { Link, usePathname } from '@/src/appLayer/translate/i18n/navigation'
import {
  Person,
  CreditCard,
  Image,
  TrendingUp,
  Typography,
} from 'car-robots-library'
import React from 'react'

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navLinks = [
    { path: '/', label: 'Users list', icon: Person },
    { path: '/statistics', label: 'Statistics', icon: TrendingUp },
    { path: '/paymentsList', label: 'Payments list', icon: CreditCard },
    { path: '/postsList', label: 'Posts list', icon: Image },
  ]
  return (
    <>
      <aside className='fixed left-0 top-[60px] h-[calc(100vh-60px)] w-55 z-50 border-r border-dark-300 '>
        <nav className='pt-18 pl-8'>
          <ul className='space-y-2'>
            {navLinks.map((link) => {
              const isActive = pathname === link.path
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`px-4 py-2 text-gray-700 hover:text-accent-500 flex gap-3
                  ${isActive ? 'text-accent-500' : ''}`}
                  >
                    <link.icon className='w-6 h-6' />
                    <Typography variant={'bold14'}>{link.label}</Typography>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
      <section className='ml-61 mt-[70px]'>{children}</section>
    </>
  )
}
