import { getOptions } from '@/src/features/user-list/ui/data'
import { OptionItem } from '@/src/features/user-list/ui/OptionItem'
import { User } from '@/src/shared/apolloClient/__generated__/graphql'

type Props = {
  isBanned: boolean
  user: User
  banUser: (userId: number, banReason: string) => void
}
export const PopoverOptions = ({ isBanned, user, banUser }: Props) => {
  return getOptions(isBanned).map((option) => (
    <OptionItem
      key={option.id}
      option={option}
      user={user}
      onBan={banUser}
    />
  ))
}
