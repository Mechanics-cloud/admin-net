import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInFields, signInSchema } from './singInSchema'
import { useMutation } from '@apollo/client'
import { CHECK_AUTH_QUERY } from '@/src/apolloClient/request'
import { AuthState, responseErrorHandler } from '@/src/common'
import { TranslationKeyFn } from '@/src/i18n/global'

export const useSignIn = (
  setState: (state: AuthState) => void,
  t: TranslationKeyFn
) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setError,
  } = useForm<SignInFields>({
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
    resolver: zodResolver(signInSchema(t)),
  })

  const [login, { error, loading: isLoading }] = useMutation(CHECK_AUTH_QUERY)

  if (error) {
    responseErrorHandler(error)
  }

  const onSubmit = handleSubmit(async (data: SignInFields) => {
    data.email = data.email.toLowerCase()

    const { data: requestData } = await login({ variables: data })

    if (requestData?.loginAdmin.logged) {
      const authData = btoa(`${data.email}:${data.password}`)
      sessionStorage.setItem('authData', authData)
      setState('authorized')
    } else {
      setError('email', {
        type: 'manual',
        message: t('SignInPage.signIn.errorResponse'),
      })
      setError('password', {
        type: 'manual',
        message: ' ',
      })
    }
  })

  return {
    control,
    isValid,
    onSubmit,
    isLoading,
  }
}
