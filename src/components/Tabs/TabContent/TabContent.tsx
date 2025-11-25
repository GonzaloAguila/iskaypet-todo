import styles from './TabContent.module.css';
import type { TabContentProps } from '../Tabs.types';

export default function TabContent({ label, children }: TabContentProps) {
  return (
    <div className={styles.tabContent}>
      <h1 className={styles.tabLabel}>{label}</h1>
      {children && <div className={styles.tabBody}>{children}</div>}
    </div>
  );
}

