import { cn } from '@/src/shared'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { Stub } from '../stub'
import { useTranslations } from 'next-intl'

type Props = {
  src: NonNullable<string>
  className?: string
  alt?: string
} & Omit<ImageProps, 'src' | 'alt' | 'className'>

export const FallbackImage = ({ src, alt, className, ...props }: Props) => {
  const [hasTriedFallback, setHasTriedFallback] = useState(false)
  const t = useTranslations('Basic')

  return (
    <div className='flex justify-center items-center w-full h-full'>
      {hasTriedFallback && <Stub title={t('emptyImages')} />}
      {!hasTriedFallback && (
        <Image
          src={src ?? ''}
          alt={alt ?? t('defaultAltImage')}
          onError={() => {
            if (!hasTriedFallback) {
              setHasTriedFallback(true)
            }
          }}
          priority
          className={cn('object-contain mx-auto', className)}
          {...props}
        />
      )}
    </div>
  )
}
