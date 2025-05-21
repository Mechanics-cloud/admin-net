'use client'

import { useQuery } from '@apollo/client'
import { GET_USER_FOTOS } from '../api/request'
import Image from 'next/image'
import { cn } from '@/src/shared'
import { useInView } from 'react-intersection-observer'
import { useCallback, useEffect, useRef } from 'react'

type Props = {
  userId: string
}

export default function UploadedFotos({ userId }: Props) {
  // const [state, setState] = useState()
  const refStop = useRef<boolean>(false)
  const refEnd = useRef<number>(0)
  const refPrevEnd = useRef<number>(0)

  const {
    data: uploadedPhotos,
    fetchMore,
    loading,
    previousData,
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

  // console.log('loading', loading)
  console.log('previousData', previousData)

  const { ref, inView } = useInView({
    delay: 1000,
    initialInView: false,
    threshold: 0.5,
  })

  // console.log('inView', inView)

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

  return (
    <>
      {uploadedPhotos?.getPostsByUser?.items?.length ? (
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
          <div
            className='w-full h-30 '
            ref={ref}
          ></div>
        </div>
      ) : (
        <div>Постов нет</div>
      )}
    </>
  )
}
