'use client'

import * as React from 'react'
import { PaymentsTable } from './PaymentsTable'

type Props = {
  userId: string
}

export function Payments(props: Props) {
  return (
    <div className={'text-light-100 pt-12'}>
      <PaymentsTable {...props} />
    </div>
  )
}
