import { Typography } from 'car-robots-library'
import { Option } from '@/src/features/user-list/ui/data'
import { useToggle } from '@/src/shared/hooks/useToggle'
import { Modal } from '@/src/shared/components/modal/Modal'
import { useTranslations } from 'next-intl'
import { MouseEvent } from 'react'

type Props = {
  option: Option
}
export const OptionItem = ({ option }: Props) => {
  const { state: isOpen, toggle } = useToggle()
  const t = useTranslations('UsersPage')

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    toggle()
  }
  return (
    <div
      key={option.id}
      className={
        'flex items-center gap-3 mb-3 cursor-pointer hover:bg-dark-400 hover:text-accent-500'
      }
      onClick={onClick}
    >
      {option.icon}
      <Typography variant={'reg14'}>{t(option.key)}</Typography>
      {isOpen && (
        <Modal
          close={toggle}
          title={'Hello Portal'}
        />
      )}
    </div>
  )
}
