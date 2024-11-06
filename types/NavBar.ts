export interface NavBar {
    item: string;
    link: string;
}

export const navbarItems: NavBar[] = [
  {
    item: 'navbar.services',
    link: 'available-cars'
  },
  {
    item: 'navbar.popular-locations',
    link: 'popular-locations'
  },
  {
    item: 'navbar.meeting-points',
    link: 'meeting-points'
  },
  {
    item: 'navbar.about',
    link: '/about'
  }
]
