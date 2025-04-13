import { TranslationKeyFn } from '@/src/i18n/global'
import { z } from 'zod'

export const signInSchema = (t: TranslationKeyFn) => {
  return z.object({
    email: z
      .string({ required_error: t('SignInPage.signIn.errorResponse') })
      .email({
        message: t('SignInPage.validation.email.composition'),
      }),
    password: z
      .string()
      .max(20, { message: t('SignInPage.validation.password.maxChar') }),
  })
}

export type SignInFields = z.infer<ReturnType<typeof signInSchema>>
