import { createPortal } from 'react-dom'
import { CloseOutline, Typography } from 'car-robots-library'
import { MouseEvent } from 'react'

type Props = {
  close: () => void
  title: string
}
export const Modal = ({ close, title }: Props) => {
  const body = document.querySelector('body')

  if (!body) return null

  const onClose = (e: MouseEvent) => {
    e.stopPropagation()
    close()
  }

  return createPortal(
    <div
      className={
        'absolute w-full h-full inset-0 flex items-center justify-center z-60 portal'
      }
    >
      <div className={'w-[328px] min-h-[288px] bg-dark-100'}>
        <div
          className={
            'px-6 py-3 flex justify-between items-center w-full border-b border-b-dark-100'
          }
        >
          <Typography variant={'h1'}>{title}</Typography>
          <CloseOutline
            width={24}
            height={24}
            onClick={onClose}
          />
        </div>
      </div>
    </div>,
    body
  )
}
