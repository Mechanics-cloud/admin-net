import { Column, formatDate } from '@/src/shared'
import { useTranslations } from 'next-intl'
import { AllPaymentItem } from './types'
import Image from 'next/image'
import avatarPlaceholder from '@/public/user-avatar-placeholder.jpg'

export const useGetAllPaymentsColumns = (): Column<AllPaymentItem>[] => {
  const userProfileTranslation = useTranslations('UserProfile')
  const timeTranslation = useTranslations('Basic.time')
  const usersPageTranslation = useTranslations('UsersPage')
  const paymentsListTranslation = useTranslations('PaymentsList')

  return [
    {
      label: userProfileTranslation('userName'),
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
      label: usersPageTranslation('dateAdded'),
      key: 'createdAt',
      sortable: true,
      render: (data) => formatDate(data.createdAt),
    },
    {
      label: userProfileTranslation('paymentsTable.priceUSD'),
      key: 'currency',
      sortable: true,
      render: (data) => data.amount,
    },
    {
      label: paymentsListTranslation('subscription'),
      key: 'subscriptionType',
      render: (data) => {
        return `1 ${timeTranslation(data.type)}`
      },
    },
    {
      label: paymentsListTranslation('paymentMethod'),
      key: 'paymentMethod',
      sortable: true,
      render: (data) => data.paymentMethod,
    },
  ]
}
