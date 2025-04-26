import { AuthState } from '../model/authChecker'
import SignIn from './SignInForm'

type Props = {
  setState: (state: AuthState) => void
}

export default function SignInWrapper({ setState }: Props) {
  return (
    <div className={'flex justify-center h-screen items-center'}>
      <SignIn setState={setState} />
    </div>
  )
}
