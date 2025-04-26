import 'car-robots-library/dist/style.css'
import '../globals.css'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'
import { routing } from '@/src/shared/translate/i18n/routing'
import { ClientProviders } from '@/src/app/_providers/clientProvider'
import { ToastContainer } from '@/src/shared/components/toast'
import { Header } from '@/src/widgets/headers'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SuperAdmin',
  description: 'Admin`ka for Inctagram',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html
      lang={locale}
      className='no-touch'
    >
      <body className={`${inter.className} antialiased bg-dark-700`}>
        <NextIntlClientProvider locale={locale}>
          <Header />
          <ClientProviders>{children}</ClientProviders>
          <ToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
