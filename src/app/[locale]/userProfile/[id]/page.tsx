export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className='m-40 animate-bounce'>{`Uploaded photos userId ${id}`}</div>
  )
}
