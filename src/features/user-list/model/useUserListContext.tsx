import { createContext, ReactNode, useContext } from 'react'
import { useUserList } from './useUserList'
import { UseUserList } from '@/src/features'

const UserListContext = createContext<UseUserList | null>(null)

export const useUserListContext = (): UseUserList => {
  const context = useContext(UserListContext)
  if (!context) {
    throw new Error('useUserListContext must be used within a UserListProvider')
  }
  return context
}

export const UserListProvider = ({ children }: { children: ReactNode }) => {
  const userList = useUserList()
  if (!userList) {
    return null
  }
  return (
    <UserListContext.Provider value={userList}>
      {children}
    </UserListContext.Provider>
  )
}
