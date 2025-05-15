'use client'

import { useQuery } from '@apollo/client'
import { GET_USER_FOTOS } from '../api/request'
import Image from 'next/image'
import { cn } from '@/src/shared'
import { useInView } from 'react-intersection-observer'
import { useCallback, useEffect } from 'react'

type Props = {
  userId: string
}

export default function UploadedFotos({ userId }: Props) {
  const { data: uploadedPhotos, fetchMore } = useQuery(GET_USER_FOTOS, {
    variables: { Id: +userId, endCursorId: 0 },
    notifyOnNetworkStatusChange: true,
  })

  const { ref, inView } = useInView()

  const handleLoadMore = useCallback(() => {
    const endCursorId = uploadedPhotos?.getPostsByUser?.items?.at(-1)?.id
    if (!endCursorId) return

    fetchMore({
      variables: { endCursorId },
    })
  }, [fetchMore, uploadedPhotos?.getPostsByUser?.items])

  useEffect(() => {
    if (inView) {
      handleLoadMore()
    }
  }, [inView, handleLoadMore])

  return (
    <>
      {uploadedPhotos?.getPostsByUser?.items?.length ? (
        <div
          className={cn(
            'mt-9 grid gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full h-full z-0'
          )}
        >
          {uploadedPhotos.getPostsByUser.items.map((item) => (
            <div
              className='relative'
              key={item.id}
            >
              <Image
                alt='image'
                className='w-full h-auto object-cover'
                height={228}
                priority
                src={item.url || ''}
                width={342}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>Постов нет</div>
      )}
      <div
        className='w-full h-3 '
        ref={ref}
      ></div>
    </>
  )
}
