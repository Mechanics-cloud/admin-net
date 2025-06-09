'use client'

import { Close, typographyVariants } from 'car-robots-library'

import {
  Bounce,
  ToastContainer as Container,
  ToastContainerProps,
} from 'react-toastify'
import { getToastClassName } from './helpers'

const ToastContainer = (args: ToastContainerProps) => (
  <Container
    autoClose={3000}
    className={typographyVariants({ variant: 'reg16' })}
    closeButton={({ closeToast }) => (
      <Close
        className={'min-w-6 min-h-6 ml-auto'}
        onClick={closeToast}
        height={'24px'}
        width={'24px'}
      />
    )}
    closeOnClick
    hideProgressBar
    icon={false}
    position={'bottom-left'}
    toastClassName={getToastClassName}
    transition={Bounce}
    {...args}
  />
)

export default ToastContainer
