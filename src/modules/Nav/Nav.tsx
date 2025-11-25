import styles from './Nav.module.css';
import type { NavProps } from './Nav.types';
import NavIconButton from './NavIconButton';
import NavLogo from './NavLogo';

export default function Nav({
  menuIcon,
  searchIcon,
  logoIcon,
  loginIcon,
  cartIcon,
}: NavProps) {
  return (
    <nav className={styles.nav}>
      <NavIconButton icon={menuIcon} />
      <NavIconButton icon={searchIcon} />
      <NavLogo icon={logoIcon} />
      <NavIconButton icon={loginIcon} />
      <NavIconButton icon={cartIcon} />
    </nav>
  );
}
