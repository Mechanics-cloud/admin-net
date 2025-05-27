import UploadedFotos from '@/src/_pages/uploadedFotos/ui/UploudedFotos'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: userId } = await params

  return (
    <>
      <UploadedFotos userId={userId} />
    </>
  )
}
