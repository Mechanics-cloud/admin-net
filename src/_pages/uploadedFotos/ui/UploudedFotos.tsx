'use client'

import { useQuery } from '@apollo/client'
import { GET_USER_FOTOS } from '../api/request'
import { cn, responseErrorHandler } from '@/src/shared'
import { useInView } from 'react-intersection-observer'
import { useCallback, useEffect, useRef } from 'react'
import NotContent from '../../404/NotContent'
import { Stub } from '@/src/shared/components/stub'
import { CircleLoader } from 'car-robots-library'
import { useTranslations } from 'next-intl'
import { FallbackImage } from '@/src/shared/components/fallbackImage'

type Props = {
  userId: string
}

export default function UploadedFotos({ userId }: Props) {
  const refStop = useRef<boolean>(false)
  const refEnd = useRef<number>(0)
  const refPrevEnd = useRef<number>(0)

  const t = useTranslations('NoPost')

  const {
    data: uploadedPhotos,
    fetchMore,
    loading,
    error,
  } = useQuery(GET_USER_FOTOS, {
    variables: { Id: +userId, endCursorId: 0 },
    notifyOnNetworkStatusChange: true,
  })

  if (uploadedPhotos?.getPostsByUser) {
    if (
      uploadedPhotos?.getPostsByUser.items?.length ===
      uploadedPhotos?.getPostsByUser.totalCount
    ) {
      refStop.current = true
    }
  }

  const { ref, inView } = useInView({
    delay: 1000,
    initialInView: false,
    threshold: 0.5,
    rootMargin: '200px 0px',
  })

  const handleLoadMore = useCallback(() => {
    const endCursorId = uploadedPhotos?.getPostsByUser?.items?.at(-1)?.id
    if (!endCursorId) return

    if (endCursorId == refPrevEnd.current) {
      refStop.current = true
    }

    refEnd.current = endCursorId

    if (!loading) {
      fetchMore({
        variables: { endCursorId },
      }).then(() => {
        refPrevEnd.current = refEnd.current
      })
    }
  }, [fetchMore, uploadedPhotos?.getPostsByUser?.items, loading])

  useEffect(() => {
    if (inView && !refStop.current) {
      handleLoadMore()
    }
  }, [inView, handleLoadMore])

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
