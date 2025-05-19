import { createPortal } from 'react-dom'
import { Button, CloseOutline, Typography } from 'car-robots-library'
import { MouseEvent, ReactNode } from 'react'

type Props = {
  close: (e: MouseEvent) => void
  title: string
  children: ReactNode
}
export const Modal = ({ close, title, children }: Props) => {
  const body = document.querySelector('body')

  if (!body) return null

  return createPortal(
    <div
      className={
        'absolute w-full h-full inset-0 flex items-center justify-center z-60 portal'
      }
    >
      <div className={'min-w-[328px] bg-dark-100'}>
        <div
          className={
            'px-6 py-3 flex justify-between gap-5 items-center w-full border-b border-b-dark-100'
          }
        >
          <Typography variant={'h1'}>{title}</Typography>
          <CloseOutline
            width={24}
            height={24}
            onClick={close}
          />
        </div>
        <div className={'px-6 py-[30px]'}>
          <Typography variant={'reg16'}>{children}</Typography>
          <div className={'flex gap-[70px] mt-[42px]'}>
            <Button
              variant={'primary'}
              className={'w-full'}
            >
              No
            </Button>
            <Button
              variant={'outline'}
              className={'w-full'}
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </div>,
    body
  )
}
