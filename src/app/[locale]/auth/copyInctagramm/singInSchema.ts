import { z } from 'zod'

export const signInSchema = () => {
  return z.object({
    email: z.string({ required_error: 't.validation.email.required' }).email({
      message: 't.validation.email.composition',
    }),
    password: z
      .string()
      .min(3, { message: 't.validation.password.minChar' })
      .max(20, { message: 't.validation.password.maxChar' }),
  })
}

export type SignInFields = z.infer<ReturnType<typeof signInSchema>>
