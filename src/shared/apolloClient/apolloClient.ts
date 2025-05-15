'use client'

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://inctagram.work/api/v1/graphql',
})

const authLink = setContext((_, { headers }) => {
  const authToken =
    typeof window !== 'undefined' ? sessionStorage.getItem('authData') : null

  return {
    headers: {
      ...headers,
      authorization: authToken ? `Basic ${authToken}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPostsByUser: {
            keyArgs: ['Id'],
            merge(existing = { items: [], pageInfo: {} }, incoming) {
              return {
                ...incoming,
                items: [...existing.items, ...incoming.items],
                pageInfo: incoming.pageInfo,
              }
            },
          },
        },
      },
    },
  }),
})

export default client
