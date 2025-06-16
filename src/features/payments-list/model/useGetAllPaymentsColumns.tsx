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
      label: 'User Name',
      key: 'userName',
      sortable: true,
      render: (data) => {
        return (
          <div className='flex gap-3 items-center my-2.5 truncate'>
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
      label: 'Date added',
      key: 'createdAt',
      sortable: true,
      render: (data) => formatDate(data.createdAt),
    },
    {
      label: t('priceUSD'),
      key: 'currency',
      sortable: true,
      render: (data) => data.currency,
    },
    {
      label: 'Subscription',
      key: 'subscriptionType',
      render: (data) => {
        return `1 ${time(data.type)}`
      },
    },
    {
      label: 'Payment Metod',
      key: 'paymentMethod',
      sortable: true,
      render: (data) => data.paymentMethod,
    },
  ]
}
