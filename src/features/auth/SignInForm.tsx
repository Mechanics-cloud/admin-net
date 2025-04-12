import { Button, Card, Typography } from 'car-robots-library'
import { useSignIn } from './useSignIn'
import { AuthState } from '@/src/common'
import { FormTextField } from '@/src/shared/components'

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
          />
          <div className={'flex mt-4'}>
            <Button
              className={'flex-1'}
              disabled={!isValid || isLoading}
              type={'submit'}
            >
              {/* {t.signIn.title} */}
              Вход
            </Button>
          </div>

          <div className={'pb-6'}></div>
        </form>
      </Card>
    </div>
  )
}

export default SignIn
