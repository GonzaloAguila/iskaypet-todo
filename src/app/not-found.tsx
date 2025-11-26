import Link from 'next/link';
import styles from './not-found.module.css';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>Pagina no encontrada</h2>
      <p className={styles.message}>
        Lo sentimos, la pagina que buscas no existe o ha sido movida.
      </p>
      <Link href="/mis-datos" className={styles.button}>
        <Button label="Volver al inicio" variant="PRIMARY" fullWidth={false} />
      </Link>
    </div>
  );
}
