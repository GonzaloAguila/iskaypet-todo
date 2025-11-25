'use client';

import type { TabsContainerProps } from '../../components/Tabs/Tabs.types';
import styles from './TabsContainer.module.css';
import MyData from './tabs/MyData';
import MyTasks from './tabs/MyTasks';
import MyReturns from './tabs/MyReturns';
import MyCommunications from './tabs/MyCommunications';
import MyBestFriends from './tabs/MyBestFriends';
import type { TabName } from './tabRoutes';

const TAB_COMPONENTS: Record<TabName, React.ComponentType> = {
  'Mis datos': MyData,
  'Mis tareas': MyTasks,
  'Mis devoluciones': MyReturns,
  'Mis comunicaciones': MyCommunications,
  'Mis mejores amigos': MyBestFriends,
};

export default function TabsContainer({ activeTab, tabs }: TabsContainerProps) {
  const activeTabLabel = tabs[activeTab] as TabName | undefined;
  const ActiveTabComponent = activeTabLabel ? TAB_COMPONENTS[activeTabLabel] : null;

  if (!ActiveTabComponent) {
    return null;
  }

  return (
    <div className={styles.tabsContainer}>
      <ActiveTabComponent />
    </div>
  );
}

