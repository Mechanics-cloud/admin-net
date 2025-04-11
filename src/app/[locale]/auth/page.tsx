'use client'

import { AuthState } from './authChecker '
import SignIn from './copyInctagramm/SignInForm'

type Props = {
  setState: (state: AuthState) => void
}

export default function LoginPage({ setState }: Props) {
  return (
    <div className={'flex justify-center h-screen items-center'}>
      <SignIn setState={setState} />
    </div>
  )
}
