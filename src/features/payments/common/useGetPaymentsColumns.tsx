import { Column, formatDate } from '@/src/shared'
import { PaymentItem } from './type'
import { useTranslations } from 'next-intl'

export const useGetFollowersColumns = (): Column<PaymentItem>[] => {
  const t = useTranslations('UserProfile.paymentsTable')
  const time = useTranslations('Basic.time')

  return [
    {
      label: t('dateOfPayment'),
      key: 'dateOfPayment',
      render: (data) => formatDate(data.dateOfPayment),
    },
    {
      label: t('endDateOfSubscription'),
      key: 'endDate',
      render: (data) => formatDate(data.endDate),
    },
    {
      label: t('priceUSD'),
      key: 'price',
      render: (data) => data.price,
    },
    {
      label: t('subscriptionType'),
      key: 'subscriptionType',
      render: (data) => {
        return `1 ${time(data.type)}`
      },
    },
    {
      label: t('paymentType'),
      key: 'paymentType',
      render: (data) => data.paymentType,
    },
  ]
}
