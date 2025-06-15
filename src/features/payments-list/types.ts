import { GetAllPaymentsQuery } from '@/src/shared/apolloClient/__generated__/graphql'

export type AllPaymentItem = GetAllPaymentsQuery['getPayments']['items'][number]

export type AllPaymentItems = GetAllPaymentsQuery['getPayments']['items']
