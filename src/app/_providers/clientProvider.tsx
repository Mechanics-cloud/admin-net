'use client'

import { ApolloProvider } from '@apollo/client'
import client from '@/src/shared/apolloClient/apolloClient'
import React from 'react'
import AuthChecker from '@/src/features/auth/model/authChecker'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthChecker>{children}</AuthChecker>
    </ApolloProvider>
  )
}
