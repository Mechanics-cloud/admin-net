import { Payments } from '@/src/features/payments'

export default async function PaymentsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: userId } = await params

  return <Payments userId={userId} />
}
