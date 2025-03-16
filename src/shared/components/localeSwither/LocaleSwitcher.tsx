'use client'

import { Locale, useLocale, useTranslations } from 'next-intl'
import React, { useTransition } from 'react'
import { routing } from '@/src/i18n/routing'
import { Select, SelectItem } from 'car-robots-library'
import { usePathname, useRouter } from '@/src/i18n/navigation'
import { useParams } from 'next/navigation'

export default function LocaleSwitcher() {
  const t = useTranslations('HomePage')
  const locale = useLocale()

  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(value: string) {
    const nextLocale = value as Locale
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      )
    })
  }

  return (
    <Select
      defaultValue={locale}
      disabled={isPending}
      onValueChange={onSelectChange}
    >
      {routing.locales.map((current) => (
        <SelectItem
          key={current}
          value={current}
        >
          {t('locale', { locale: current ?? 'ru' })}
        </SelectItem>
      ))}
    </Select>
  )
}
