export type Follower = {
  __typename?: 'Follow'
  id: number
  userName?: string | null
  firstName?: string | null
  lastName?: string | null
  createdAt: string
  userId: number
}

import { GetPaymentsByUserQuery } from '@/src/shared/apolloClient/__generated__/graphql'

export type PaymentItem =
  GetPaymentsByUserQuery['getPaymentsByUser']['items'][number]

export type PaymentItems = GetPaymentsByUserQuery['getPaymentsByUser']['items']
