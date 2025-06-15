'use client'

import * as React from 'react'

import { AllPaymentsListTable } from '@/src/features/payments-list/PaymentsTable'

export default function UsersPage() {
  return (
    <div className={'text-light-100 pt-12 pr-16'}>
      <AllPaymentsListTable />
    </div>
  )
}
