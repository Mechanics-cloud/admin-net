import React from 'react'
import ProfileLayout from '../ui/ProfileLayout'

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
