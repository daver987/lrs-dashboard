export const menu = () => {
  return {
    menuItems: [
      {
        name: 'My Office',
        to: '/dashboard',
        icon: 'inbox',
        id: 1,
      },
      {
        name: 'Accounts',
        to: '/accounts',
        icon: 'groups',
        id: 2,
      },
      {
        name: 'Quotes',
        to: '/quotes',
        icon: 'request_quote',
        id: 3,
      },
      {
        name: 'Reservations',
        to: '/reservations',
        icon: 'calendar_month',
        id: 4,
      },
      {
        name: 'My Profile',
        to: '/profile',
        icon: 'group',
        id: 5,
      },
    ],
  }
}
