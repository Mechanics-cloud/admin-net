import Sidebar from '@/src/widgets/sidebar/Sidebar'
import React from 'react'

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Sidebar>{children}</Sidebar>
}
