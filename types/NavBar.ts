export interface NavBar {
    item: string;
    link: string;
}

// export const navbarItems: {
//  [
//     {
//       item: $t('navbar.services'),
//       link: 'available-cars'
//     },
//     {
//       item: $t('navbar.meeting-points'),
//       link: 'meeting-points'
//     },
//     {
//       item: $t('navbar.faq'),
//       link: 'faq'
//     },
//     {
//       item: $t('navbar.about'),
//       link: '/about'
//     }
//   ]
//   return { items }
// }

export const navbarItems: NavBar[] = [
  {
    item: 'navbar.services',
    link: 'available-cars'
  },
  {
    item: 'navbar.meeting-points',
    link: 'meeting-points'
  },
  {
    item: 'navbar.faq',
    link: 'faq'
  },
  {
    item: 'navbar.about',
    link: '/about'
  }
]
