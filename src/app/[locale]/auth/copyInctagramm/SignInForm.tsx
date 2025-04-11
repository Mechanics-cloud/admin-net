// import { Button, Card, Typography, useTranslation } from '@/common'
// import { FormTextField } from '@/common/form'
// import { FormTextField } from './form/FormTextField'
import { Button, Card, Typography } from 'car-robots-library'
import { useSignIn } from './useSignIn'
import { FormTextField } from './form/FormTextField'
import { AuthState } from '../authChecker '
// import { useSignIn } from './useSignIn'
// import { useTranslations } from 'next-intl'

type Props = {
  setState: (state: AuthState) => void
}

const SignIn = ({ setState }: Props) => {
  // const t = useTranslations('HomePage')
  const { control, onSubmit, isValid, isLoading } = useSignIn(setState)

  return (
    <div
      className={
        'md:mt-[36px] mt-4 md:w-[378px] mx-auto box-border border-transparent'
      }
    >
      <Card className={'contents md:block pb-9'}>
        <Typography
          className={'text-center pb-9 pt-4'}
          variant={'h1'}
        >
          {/* {t.signIn.title} */}
          Вход
        </Typography>
        <form
          className={'flex flex-col w-full h-full'}
          noValidate
          onSubmit={onSubmit}
        >
          <FormTextField
            control={control}
            disabled={isLoading}
            label={'Email'}
            name={'email'}
            placeholder={'epam@epam.com'}
            type={'email'}
          />
          <FormTextField
            control={control}
            disabled={isLoading}
            label={'Password'}
            name={'password'}
            // placeholder={t.signIn.placeholderPassword}
            placeholder={'password'}
            type={'password'}
            className={'pb-4'}
          />

          <Button
            disabled={!isValid || isLoading}
            type={'submit'}
          >
            {/* {t.signIn.title} */}
            Вход
          </Button>
          <div className={'pb-6'}></div>
        </form>
      </Card>
    </div>
  )
}

export default SignIn
