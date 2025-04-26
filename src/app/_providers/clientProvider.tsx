'use client'

import { ApolloProvider } from '@apollo/client'
import client from '@/src/appLayer/apolloClient/apolloClient'
import React from 'React'
import AuthChecker from '@/src/features/auth/model/authChecker'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthChecker>{children}</AuthChecker>
    </ApolloProvider>
  )
}
