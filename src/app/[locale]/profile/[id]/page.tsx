import UploadedFotos from '@/src/_pages/uploadedFotos/ui/UploudedFotos'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

type SearchParams = 'uploadedPhotos' | 'payments' | 'followers' | 'following'
const tabComponents = (userId: string): Record<SearchParams, ReactNode> => {
  return {
    uploadedPhotos: <UploadedFotos userId={userId} />,
    payments: <div>Payments</div>,
    followers: <div>Followers</div>,
    following: <div>Following</div>,
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ tab: SearchParams }>
}) {
  const { id: userId } = await params
  const { tab } = await searchParams

  if (!tab) {
    redirect(`/en/profile/${userId}?tab=uploadedPhotos`)
  }

  return tabComponents(userId)[tab] ?? <UploadedFotos userId={userId} />
}
