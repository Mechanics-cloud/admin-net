import { ReactNode } from 'react'
import UploadedFotos from '@/src/_pages/uploadedFotos/ui/UploudedFotos'
import FollowersTable from '@/src/features/profile/ui/followers/Followers'

export type SearchParams =
  | 'uploadedPhotos'
  | 'payments'
  | 'followers'
  | 'following'
export default function getTabs(
  userId: string
): Record<SearchParams, ReactNode> {
  return {
    uploadedPhotos: <UploadedFotos userId={userId} />,
    payments: <div>Payments</div>,
    followers: <FollowersTable userId={+userId} />,
    following: <div>Following</div>,
  }
}
