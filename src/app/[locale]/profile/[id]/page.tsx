import UploadedFotos from '@/src/_pages/uploadedFotos/ui/UploudedFotos'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import FollowersTable from '@/src/features/profile/ui/followers/Followers'

type SearchParams = 'uploadedPhotos' | 'payments' | 'followers' | 'following'
const getTabs = (userId: string): Record<SearchParams, ReactNode> => {
  return {
    uploadedPhotos: <UploadedFotos userId={userId} />,
    payments: <div>Payments</div>,
    followers: <FollowersTable userId={+userId} />,
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
    redirect(`/profile/${userId}?tab=uploadedPhotos`)
  }

  return getTabs(userId)[tab] ?? <UploadedFotos userId={userId} />
}
