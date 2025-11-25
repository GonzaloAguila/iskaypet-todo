'use client';

import TabBar from '../../components/TabBar';
import TabsContainer from './TabsContainer';

export interface TabsLayoutProps {
  tabs: readonly string[];
  activeTab: number;
}

export default function TabsLayout({ tabs, activeTab }: TabsLayoutProps) {
  return (
    <>
      <TabBar tabs={tabs} activeTab={activeTab} />
      <TabsContainer activeTab={activeTab} tabs={tabs} />
    </>
  );
}

