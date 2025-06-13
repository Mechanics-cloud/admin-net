import { Column, formatDate } from '@/src/shared'
import { useTranslations } from 'next-intl'
import { AllPaymentItem } from './types'
import Image from 'next/image'
import avatarPlaceholder from '@/public/user-avatar-placeholder.jpg'

export const useGetAllPaymentsColumns = (): Column<AllPaymentItem>[] => {
  const t = useTranslations('UserProfile.paymentsTable')
  const time = useTranslations('Basic.time')

  return [
    {
      // label: t('dateOfPayment'),
      label: 'User Name',
      key: 'dateOfPayment',
      render: (data) => {
        return (
          <div className='flex gap-3 items-center my-2.5'>
            <Image
              alt='avatar'
              src={data.avatars?.[0]?.url ?? avatarPlaceholder}
              height={36}
              width={36}
              priority
              className={'rounded-full'}
            />
            {data.userName}
          </div>
        )
      },
    },
    {
      // label: t('endDateOfSubscription'),
      label: 'Date Add',
      key: 'endDate',
      render: (data) => formatDate(data.createdAt),
    },
    {
      label: t('priceUSD'),
      key: 'price',
      render: (data) => data.currency,
    },
    {
      // label: t('subscriptionType'),
      label: 'subscription',
      key: 'subscriptionType',
      render: (data) => {
        return `1 ${time(data.type)}`
      },
    },
    {
      // label: t('paymentType'),
      label: 'Payment Metod',
      key: 'paymentType',
      render: (data) => data.paymentMethod,
    },
  ]
}
