import { createPortal } from 'react-dom'
import { Button, CloseOutline, Typography } from 'car-robots-library'
import { ComponentPropsWithoutRef, MouseEvent } from 'react'
import { cn } from '@/src/shared'

type Props = {
  close: (e: MouseEvent) => void
  title: string
  showButtons?: boolean
  isToggleBan?: boolean
  setShowButtons?: (showButtons: boolean) => void
} & ComponentPropsWithoutRef<'div'>

export const Modal = ({
  close,
  title,
  children,
  className,
  ...props
}: Props) => {
  const body = document.querySelector('body')

  if (!body) return null

  return createPortal(
    <div
      className={
        'absolute w-full h-full inset-0 flex items-center justify-center z-50 portal'
      }
    >
      <div
        className={cn('min-w-[378px]  bg-dark-100 flex flex-col', className)}
        {...props}
      >
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
        <div
          className={'px-6 py-[30px] flex flex-col justify-between flex-grow'}
        >
          {children}
          <div className={'flex gap-[70px] mt-[48px]'}>
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
