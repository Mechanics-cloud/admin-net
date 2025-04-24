import { Button, Card, Typography } from 'car-robots-library'
import { useSignIn } from '../model/useSignIn'
import { FormTextField } from '@/src/shared/components'
import { useTranslations } from 'next-intl'
import { TranslationKeyFn } from '@/src/appLayer/translate/i18n/global'
import { AuthState } from '../model/authChecker '

type Props = {
  setState: (state: AuthState) => void
}

const SignIn = ({ setState }: Props) => {
  const t = useTranslations()
  const { control, onSubmit, isValid, isLoading } = useSignIn(
    setState,
    t as TranslationKeyFn
  )

  return (
    <div
      className={
        'md:mt-[36px] mt-4 md:w-[378px] mx-auto box-border border-transparent'
      }
    >
      <Card
        className={`contents md:block pb-9 ${isLoading ? 'animate-pulse' : ''}`}
      >
        <Typography
          className={'text-center pb-9 pt-4'}
          variant={'h1'}
        >
          {t('SignInPage.signIn.title')}
        </Typography>
        <form
          className={'flex flex-col w-full h-full'}
          noValidate
          onSubmit={onSubmit}
        >
          <FormTextField
            control={control}
            disabled={isLoading}
            label={t('SignInPage.signIn.labelEmail')}
            name={'email'}
            placeholder={'epam@epam.com'}
            type={'email'}
          />
          <FormTextField
            control={control}
            disabled={isLoading}
            label={t('SignInPage.signIn.labelPassword')}
            name={'password'}
            placeholder={t('SignInPage.signIn.placeholderPassword')}
            type={'password'}
          />
          <div className={'flex mt-4'}>
            <Button
              className={`flex-1 ${isLoading ? 'animate-pulse' : ''}`}
              disabled={!isValid || isLoading}
              type={'submit'}
            >
              {t('SignInPage.signIn.title')}
            </Button>
          </div>

          <div className={'pb-6'}></div>
        </form>
      </Card>
    </div>
  )
}

export default SignIn
