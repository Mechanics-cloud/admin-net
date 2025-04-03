'use client'

import 'React'
import { ApolloProvider } from '@apollo/client'
import client from '@/src/apolloClient/apolloClient'
// import AuthChecker from '@/src/app/[locale]/auth/authChecker '

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {/* <AuthChecker /> */}
      {children}
    </ApolloProvider>
  )
}
