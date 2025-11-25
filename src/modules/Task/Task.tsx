'use client';

import Image from 'next/image';
import Card from '../../components/Card';
import styles from './Task.module.css';
import type { TaskProps } from './Task.types';
import { capitalizeFirst } from '../../utils/string';

const LOREM_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris, ac elementum ultrices mauris. Cursus urna';

export default function Task({ title, onDelete }: TaskProps) {
  return (
    <Card className={styles.taskCard}>
      <div className={styles.taskContent}>
        <div className={styles.taskText}>
          <h3 className={styles.taskTitle}>{capitalizeFirst(title)}</h3>
          <p className={styles.taskBody}>{LOREM_TEXT}</p>
        </div>
        <button 
          className={styles.deleteButton} 
          onClick={onDelete}
          aria-label="Eliminar tarea"
        >
          <Image
            src="/Trash.svg"
            alt="Eliminar"
            width={18}
            height={18}
          />
        </button>
      </div>
    </Card>
  );
}

