export interface NavBar {
    item: string;
    link: string;
}

export const useNavbarItems = () => {
  const { $t } = useLanguage()
  const items: NavBar[] = [
    {
      item: $t('navbar.services'),
      link: 'available-cars'
    },
    {
      item: $t('navbar.meeting-points'),
      link: 'meeting-points'
    },
    {
      item: $t('navbar.faq'),
      link: 'faq'
    },
    {
      item: $t('navbar.contact'),
      link: '/contact'
    }
  ]
  return { items }
}
