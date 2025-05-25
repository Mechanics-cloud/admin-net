import Image from 'next/image'
import defaultPlaceholder from '@/public/noUserPosts.svg'
import { cn } from '../../utils'
import { Typography } from 'car-robots-library'
import { useTranslations } from 'next-intl'
import { StubTypes } from './type'

export const Stub = ({
  alt,
  className,
  imageClassName,
  src = defaultPlaceholder,
  textClassName,
  title,
  variant = 'small',
}: StubTypes) => {
  const t = useTranslations('Basic')

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center h-full',
        className
      )}
    >
      <Image
        alt={alt || t('defaultStubImage')}
        className={cn('w-full opacity-90', imageClassName)}
        src={src}
        priority
      />
      <Typography
        className={cn('text-light-900 text-center mt-3', textClassName)}
        variant={variant}
      >
        {title}
      </Typography>
    </div>
  )
}
