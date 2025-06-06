import { tabItems } from '../common/helper'
import { cn } from '@/src/shared'
import { usePathname, useRouter } from '@/src/shared/translate/i18n/navigation'
import { Button } from 'car-robots-library'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

export function ButtonsGroup({ paramsId }: { paramsId: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const t = useTranslations('UserProfile')

  const currentTab = searchParams.get('tab')
  const basePath = `/profile/${paramsId}`

  const navigateToTab = (item: {
    title: 'uploadedPhotos' | 'payments' | 'following' | 'followers'
    href: string
  }) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', item.href)
    router.replace(`${basePath}?${params.toString()}`)
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 mt-10'>
      {tabItems.map((item) => {
        const isActive = currentTab === item.href
        return (
          <Button
            key={item.title}
            variant={'text'}
            onClick={() => navigateToTab(item)}
            className={cn(
              `pb-2.5 text-dark-100 focus-within:outline-0 border-b-2 border-dark-100 ${
                pathname === `${basePath}/${item.href}` || isActive
                  ? 'text-accent-700! border-accent-700!'
                  : ''
              }`
            )}
          >
            {t(item.title)}
          </Button>
        )
      })}
    </div>
  )
}
