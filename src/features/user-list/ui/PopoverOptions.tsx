import { BlockedIcon } from '@/src/assets/icons/outlineIcons/BlockedIcon'
import {
  MoreHorizontalOutline,
  PersonOutline,
  Typography,
} from 'car-robots-library'
import { useTranslations } from 'next-intl'

export const PopoverOptions = () => {
  const t = useTranslations('UsersPage')
  return (
    <>
      <div className={'flex items-center gap-3 mb-3'}>
        <PersonOutline
          width={24}
          height={24}
        />
        <Typography variant={'reg14'}>{t('popover.deleteUser')}</Typography>
      </div>
      <div className={'flex items-center gap-3 mb-3'}>
        <BlockedIcon />
        <Typography variant={'reg14'}>{t('popover.ban')}</Typography>
      </div>
      <div className={'flex items-center gap-3'}>
        <MoreHorizontalOutline
          width={24}
          height={24}
        />
        <Typography variant={'reg14'}>{t('popover.moreInfo')}</Typography>
      </div>
    </>
  )
}
