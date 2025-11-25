'use client';

import Link from 'next/link';
import styles from './TabBar.module.css';
import type { TabBarProps } from './TabBar.types';
import { tabToSlug } from '../../layouts/TabsLayout/tabRoutes';

export default function TabBar({ tabs, activeTab }: TabBarProps) {
  return (
    <div className={styles.tabBar}>
      {tabs.map((tab, index) => {
        const slug = tabToSlug(tab);
        const isActive = activeTab === index;
        
        return (
          <Link
            key={`${tab}-${index}`}
            href={`/${slug}`}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
          >
            {tab}
          </Link>
        );
      })}
    </div>
  );
}
