import {useLocale, useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {
  const t = useTranslations('HomePage');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {routing.locales.map((current) => (
        <option key={current} value={current}>
          {t('locale', {locale: current ?? 'ru'})}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}