'use client'

import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { CHECK_AUTH_QUERY } from '@/src/apolloClient/request'
import { useRouter } from '@/src/i18n/navigation'
import SignInWrapper from '@/src/features/auth/SignInWrapper'
import { responseErrorHandler } from './responseErrorHandler'

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
        sessionStorage.removeItem('authData')
        setAuthState('unauthorized')
        responseErrorHandler(error)
      }
    }

    verifyAuth()
  }, [checkAuth, router])
  if (authState === 'unauthorized') {
    return <SignInWrapper setState={setAuthState} />
  }

  if (authState === 'authorized') {
    return <>{children}</>
  }

  return null
}

export default AuthChecker
