import { toast } from 'react-toastify'
import { ApolloError } from '@apollo/client'
import { z } from 'zod'

/**
 *
 * @param error - Some error (zod, ApolloError or code)
 *
 */

export const responseErrorHandler = (error: unknown) => {
  const basicErrorMessage = 'Something went wrong'

  if (error instanceof z.ZodError) {
    toast.error(error.errors[0].message)
    return
  }

  if (error instanceof Error) {
    toast.error(error.message)
    return
  }

  if (error instanceof ApolloError) {
    toast.error(error.message)
    return
  }

  toast.error(basicErrorMessage)

  return
}
