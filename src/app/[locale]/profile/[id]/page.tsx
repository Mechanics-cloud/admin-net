import UploadedFotos from '@/src/features/profile/ui/uploadedFotos/UploudedFotos'
import { redirect } from 'next/navigation'
import { SearchParams } from '@/src/features'
import getTabs from '@/src/features/profile/ui/getTabs'

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
