export interface TabContentProps {
  label: string;
  children?: React.ReactNode;
}

export interface TabsContainerProps {
  activeTab: number;
  tabs: readonly string[];
}

