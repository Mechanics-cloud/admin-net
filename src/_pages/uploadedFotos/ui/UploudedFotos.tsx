'use client'

import { cn, responseErrorHandler } from '@/src/shared'
import NotContent from '../../404/NotContent'
import { Stub } from '@/src/shared/components/stub'
import { CircleLoader } from 'car-robots-library'
import { useTranslations } from 'next-intl'
import { FallbackImage } from '@/src/shared/components/fallbackImage'
import { useGetFotos } from '../common/useGetFotos'

type Props = {
  userId: string
}

export default function UploadedFotos({ userId }: Props) {
  const t = useTranslations('NoPost')

  const { uploadedPhotos, loading, error, ref } = useGetFotos(userId)

  if (error) {
    responseErrorHandler(error)
    return <NotContent />
  }

  return (
    <>
      {uploadedPhotos?.getPostsByUser?.items?.length ? (
        <>
          <div
            className={cn(
              'mt-9 grid gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full h-full z-0'
            )}
          >
            {uploadedPhotos.getPostsByUser.items.map((item, index) => (
              <div
                className='relative'
                key={`${item.id}${index}`}
              >
                {item.url && (
                  <FallbackImage
                    src={item.url}
                    height={228}
                    width={342}
                  />
                )}
              </div>
            ))}
          </div>
          <div
            className='w-full h-1'
            ref={ref}
          ></div>
          {loading && (
            <CircleLoader
              className={'w-full h-[114px] flex justify-center items-center'}
            />
          )}
        </>
      ) : loading ? (
        <div className='mx-auto w-fit mt-10'>
          <CircleLoader />
        </div>
      ) : (
        <Stub
          alt={t('alt')}
          title={t('defaultText')}
          variant='h1'
          imageClassName='mt-10'
        />
      )}
    </>
  )
}
