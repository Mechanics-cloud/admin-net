import {
  MoreHorizontalOutline,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useToggle,
} from 'car-robots-library'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export const UserPopover = ({ children }: Props) => {
  const { state: isOpen, toggle } = useToggle()
  return (
    <Popover
      onOpenChange={toggle}
      open={isOpen}
    >
      <PopoverTrigger asChild>
        <button
          title={'menu'}
          type={'button'}
        >
          <MoreHorizontalOutline
            aria-label={'вызов настроек'}
            className={`size-6 active:text-accent-500 hover:text-accent-500 ${
              isOpen ? 'text-accent-500' : ''
            }`}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={'z-50 w-[200px] min-h-[85px] absolute px-2 py-3 right-0'}
        sideOffset={3}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}
