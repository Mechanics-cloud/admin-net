import { useCallback, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/client'
import { useInView } from 'react-intersection-observer'
import { GET_USER_FOTOS } from '../api'

export const useGetFotos = (userId: string) => {
  const refStop = useRef<boolean>(false)
  const refEnd = useRef<number>(0)
  const refPrevEnd = useRef<number>(0)

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

  return { uploadedPhotos, loading, error, ref }
}
