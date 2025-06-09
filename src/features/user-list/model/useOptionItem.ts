import { responseErrorHandler, useToggle } from '@/src/shared'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import {
  BAN_USER,
  Option,
  REMOVE_USER,
  UNBAN_USER,
  useUserListContext,
} from '@/src/features'
import { MouseEvent, useState } from 'react'
import { useMutation } from '@apollo/client'

export const useOptionItem = (option: Option, userId: number) => {
  const [selectValue, setSelectValue] = useState<string>('')
  const { state: isOpen, toggle } = useToggle()
  const t = useTranslations('UsersPage')
  const router = useRouter()

  const { toggleBanUser, deleteUser } = useUserListContext()

  const onClick = (e: MouseEvent) => {
    if (option.key === 'popover.moreInfo') {
      router.push(`/profile/${userId}`)
    }
    e.stopPropagation()
    toggle()
  }

  const onValueChange = (value: string) => {
    setSelectValue(value)
  }

  const [banUserById, { loading }] = useMutation(BAN_USER, {
    variables: {
      userId,
      banReason: selectValue,
    },
    onError: (error) => {
      setSelectValue('')
      responseErrorHandler(error)
    },
  })

  const [unbanUserById] = useMutation(UNBAN_USER, {
    variables: {
      userId,
    },
    onError: (error) => {
      responseErrorHandler(error)
    },
  })

  const [removeUserById] = useMutation(REMOVE_USER, {
    variables: {
      userId,
    },
    onError: (error) => {
      responseErrorHandler(error)
    },
  })

  const toggleBan = async () => {
    const action = option.key === 'popover.ban' ? 'ban' : 'unban'
    const reason = action === 'ban' ? selectValue : ''

    if (action === 'ban') {
      await banUserById()
      setSelectValue('')
    } else {
      await unbanUserById()
    }
    toggleBanUser({ userId, action, reason })
  }

  const removeUser = async () => {
    console.log(userId)
    await removeUserById()
    deleteUser(userId)
  }

  const onConfirm = async () => {
    if (option.key === 'popover.ban' || option.key === 'popover.unban') {
      await toggleBan()
    } else {
      await removeUser()
    }
  }

  return {
    onClick,
    onValueChange,
    onConfirm,
    isOpen,
    selectValue,
    toggleBan,
    removeUser,
    t,
    loading,
  }
}
