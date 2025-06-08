import { ReactNode } from 'react'
import UploadedFotos from '@/src/features/profile/ui/uploadedFotos/UploudedFotos'
import FollowersTable from '@/src/features/profile/ui/followers/Followers'
import { PaymentsTable } from './payments'
import FollowingTable from './following/Following'

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
    payments: <PaymentsTable userId={userId} />,
    followers: <FollowersTable userId={+userId} />,
    following: <FollowingTable userId={+userId} />,
  }
}
