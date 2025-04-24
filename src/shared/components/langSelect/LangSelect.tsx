'use client'
import {
  usePathname,
  useRouter,
} from '@/src/appLayer/translate/i18n/navigation'
import {
  FlagRussia,
  FlagUnitedKingdom,
  Select,
  SelectItem,
} from 'car-robots-library'
import { Locale, useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import * as React from 'react'

export const dynamic = 'force-dynamic'

export const LangSelect = () => {
  const locale = useLocale()

  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
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
      className={'[&>button]:border-none focus-within:outline2'}
      defaultValue={locale ?? 'ru'}
      disabled={isPending}
      onValueChange={onSelectChange}
    >
      <SelectItem
        className={'[&>span]:gap-3'}
        value={'en'}
      >
        <FlagUnitedKingdom
          aria-label={'Switch to english'}
          className={'size-6'}
        />
        <span className={'max-sm:hidden'}>English</span>
      </SelectItem>
      <SelectItem
        className={'[&>span]:gap-3'}
        value={'ru'}
      >
        <FlagRussia
          aria-label={'Переключиться на русский язык'}
          className={'size-6'}
        />
        <span className={'max-sm:hidden'}>Русский</span>
      </SelectItem>
    </Select>
  )
}
