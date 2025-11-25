import Image from 'next/image';
import styles from './Nav.module.css';
import type { NavIcon } from './Nav.types';

export interface NavIconButtonProps {
  icon: NavIcon;
}

export default function NavIconButton({ icon }: NavIconButtonProps) {
  return (
    <button className={styles.iconButton} aria-label={icon.alt}>
      <Image
        src={icon.src}
        alt={icon.alt}
        width={icon.width}
        height={icon.height}
        priority
      />
    </button>
  );
}

