import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { SignInFields, signInSchema } from './singInSchema'
import { useMutation } from '@apollo/client'
import { CHECK_AUTH_QUERY } from '@/src/apolloClient/request'
import { AuthState } from '@/src/common'

export const useSignIn = (setState: (state: AuthState) => void) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<SignInFields>({
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
    resolver: zodResolver(signInSchema()),
  })

  const [login, { error, loading: isLoading }] = useMutation(CHECK_AUTH_QUERY)

  const onSubmit = handleSubmit(async (data: SignInFields) => {
    data.email = data.email.toLowerCase()

    // отправка запроса
    const { data: requestData } = await login({ variables: data })

    if (error) {
      //TODO вызвать тост, произошла ошибка запроса
    }

    if (requestData?.loginAdmin.logged) {
      const authData = btoa(`${data.email}:${data.password}`)
      sessionStorage.setItem('authData', authData)
      setState('authorized')
    }
  })

  return {
    control,
    isValid,
    onSubmit,
    isLoading,
  }
}
