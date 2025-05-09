import ProfileLayout from '@/src/widgets/profileLayout/ui/ProfileLayout'
import React from 'react'

export default async function SidebarLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ProfileLayout paramsId={id}>{children}</ProfileLayout>
}
