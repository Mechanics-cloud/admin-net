import { getOptions } from '@/src/features/user-list/ui/data'
import { OptionItem } from '@/src/features/user-list/ui/OptionItem'

export const PopoverOptions = ({ isBanned }: { isBanned: boolean }) => {
  return getOptions(isBanned).map((option) => (
    <OptionItem
      key={option.id}
      option={option}
    />
  ))
}
