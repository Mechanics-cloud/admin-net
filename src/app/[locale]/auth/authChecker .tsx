'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { CHECK_AUTH_QUERY } from '@/src/apolloClient/request'
import LoginPage from './page'

export type AuthState = 'checking' | 'authorized' | 'unauthorized'

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>('checking')
  const [checkAuth] = useMutation(CHECK_AUTH_QUERY)
  const router = useRouter()

  useEffect(() => {
    const verifyAuth = async () => {
      const authData = sessionStorage.getItem('authData')

      if (!authData) {
        setAuthState('unauthorized')
        router.push('/')
        return
      }

      try {
        const [email, password] = atob(authData).split(':')
        const { data } = await checkAuth({
          variables: { email, password },
        })

        if (data?.loginAdmin.logged) {
          setAuthState('authorized')
        } else {
          sessionStorage.removeItem('authData')
          setAuthState('unauthorized')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        sessionStorage.removeItem('authData')
        setAuthState('unauthorized')
      }
    }

    verifyAuth()
    console.log('verifyAuth()')
  }, [checkAuth, router]) // если добавить pathname то проверка будет при переходе на каждую страницу

  if (authState === 'unauthorized') {
    return <LoginPage setState={setAuthState} />
  }

  if (authState === 'checking') {
    return <div>Checking authorization...</div>
  }

  if (authState === 'authorized') {
    return <>{children}</>
  }

  // При unauthorized будет редирект через useEffect
  return null
}

export default AuthChecker
