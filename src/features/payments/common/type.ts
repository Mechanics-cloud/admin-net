import { GetPaymentsByUserQuery } from '@/src/shared/apolloClient/__generated__/graphql'

export type PaymentItem =
  GetPaymentsByUserQuery['getPaymentsByUser']['items'][number]

export type PaymentItems = GetPaymentsByUserQuery['getPaymentsByUser']['items']
