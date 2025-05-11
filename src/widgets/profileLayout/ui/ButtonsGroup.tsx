import { tabItems } from '../common/helper'
import { cn } from '@/src/shared'
import { usePathname, useRouter } from '@/src/shared/translate/i18n/navigation'
import { Button } from 'car-robots-library'
import { useTranslations } from 'next-intl'

export function ButtonsGroup({ paramsId }: { paramsId: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const t = useTranslations('UserProfile')

  const basePath = `/userProfile/${paramsId}`

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 mt-10'>
      {tabItems.map((item) => {
        return (
          <Button
            key={item.title}
            variant={'text'}
            onClick={() => {
              router.replace(item.href ? `${basePath}/${item.href}` : basePath)
            }}
            className={cn(
              `pb-2.5 text-dark-100 focus-within:outline-0 border-b-2 border-dark-100 ${
                pathname === `${basePath}/${item.href}` ||
                (pathname === basePath && item.href === '')
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
