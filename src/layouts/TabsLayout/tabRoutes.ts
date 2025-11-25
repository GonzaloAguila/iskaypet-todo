export const TABS = [
  'Mis datos',
  'Mis tareas',
  'Mis devoluciones',
  'Mis comunicaciones',
  'Mis mejores amigos',
] as const;

export type TabName = (typeof TABS)[number];

export const tabToSlug = (tabName: string): string => { 
  return tabName
    .toLowerCase()
    .normalize('NFD')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

export const slugToTab = (slug: string): TabName | null => {
  const tab = TABS.find(t => tabToSlug(t) === slug);
  return tab || null;
};

export const getTabIndexBySlug = (slug: string): number => {
  const tab = slugToTab(slug);
  if (!tab) return 0;
  return TABS.indexOf(tab);
};
