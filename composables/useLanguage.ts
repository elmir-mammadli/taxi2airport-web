import { useI18n } from 'vue-i18n';
export const useLanguage = () => {
  const { locale, t: $t } = useI18n();

  return { $t, locale };
};
