import { getOptions, OptionItem } from '@/src/features'
import { User } from '@/src/shared/apolloClient/__generated__/graphql'

type Props = {
  isBanned: boolean
  user: User
}
export const PopoverOptions = ({ isBanned, user }: Props) => {
  return getOptions(isBanned).map((option) => (
    <OptionItem
      key={option.id}
      option={option}
      user={user}
    />
  ))
}
