'use client'

import { createContext, ReactNode, useContext } from 'react'
import { useAllPaymentsList } from './useAllPaymentsList'

const PaymentsListContext = createContext<unknown | null>(null)

export const usePaymentsListContext = (): unknown => {
  const context = useContext(PaymentsListContext)
  if (!context) {
    throw new Error(
      'usePaymentsListContext must be used within a UserListProvider'
    )
  }
  return context
}

export const PaymentsListProvider = ({ children }: { children: ReactNode }) => {
  const userList = useAllPaymentsList()
  if (!userList) {
    return null
  }
  return (
    <PaymentsListContext.Provider value={userList}>
      {children}
    </PaymentsListContext.Provider>
  )
}
