import Image from 'next/image';
import styles from './Nav.module.css';
import type { NavIcon } from './Nav.types';

export interface NavLogoProps {
  icon: NavIcon;
}

export default function NavLogo({ icon }: NavLogoProps) {
  return (
    <div className={styles.logo}>
      <Image
        src={icon.src}
        alt={icon.alt}
        width={icon.width}
        height={icon.height}
        priority
      />
    </div>
  );
}

