'use client'

import { ApolloProvider } from '@apollo/client'
import client from '@/src/apolloClient/apolloClient'
import AuthChecker from '@/src/common/utils/authChecker '
import React from 'React'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthChecker>{children}</AuthChecker>
    </ApolloProvider>
  )
}
