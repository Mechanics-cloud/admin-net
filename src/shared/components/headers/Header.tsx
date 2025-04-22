'use client'
import { Link } from '@/src/i18n/navigation'
import { LangSelect } from '../langSelect'
import { Typography } from 'car-robots-library'

export const Header = () => {
  return (
    <div
      className={
        'h-[var(--header-height)] fixed bg-dark-700 border-b border-b-dark-300 top-0 w-full flex gap-3 justify-between items-center px-15 max-sm:px-5'
      }
    >
      <Link href={'/'}>
        <div className='flex items-end'>
          <Typography
            variant={'h1'}
            className=''
          >
            Inctagram
          </Typography>
          <Typography
            variant={'small'}
            className='pb-1'
          >
            SuperAdmin
          </Typography>
        </div>
      </Link>
      <LangSelect />
    </div>
  )
}
