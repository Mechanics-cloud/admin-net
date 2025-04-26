import messages from '../messages/en.json'
import { routing } from '@/src/shared/translate/i18n/routing'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}

type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? `${K}` | `${K}.${DeepKeys<T[K]>}`
        : never
    }[keyof T]
  : never

type TranslationPaths = DeepKeys<typeof messages>

export type TranslationKeyFn = {
  (key: TranslationPaths): string
  (key: TranslationPaths, values: Record<string, unknown>): string
}
