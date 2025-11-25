export interface NavIcon {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface NavProps {
  menuIcon: NavIcon;
  searchIcon: NavIcon;
  logoIcon: NavIcon;
  loginIcon: NavIcon;
  cartIcon: NavIcon;
}


export const navProps: NavProps = {
  menuIcon: {
    src: '/Menu.svg',
    alt: 'Menu',
    width: 24,
    height: 22,
  },
  searchIcon: {
    src: '/Search.svg',
    alt: 'Search',
    width: 20,
    height: 20,
  },
  logoIcon: {
    src: '/Logo.svg',
    alt: 'Logo',
    width: 187,
    height: 26,
  },
  loginIcon: {
    src: '/Login.svg',
    alt: 'Login',
    width: 23,
    height: 23,
  },
  cartIcon: {
    src: '/Cart.svg',
    alt: 'Cart',
    width: 32,
    height: 26,
  },
};

