import "../globals.css";
import Nav from "../../modules/Nav";
import { navProps } from "../../modules/Nav/Nav.types";
import TabsLayout from "../../layouts/TabsLayout";
import { TABS, getTabIndexBySlug } from "../../layouts/TabsLayout/tabRoutes";

export default async function TabLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ tab: string }>;
}>) {
  const { tab } = await params;
  const activeTab = getTabIndexBySlug(tab);

  return (
    <>
      <Nav {...navProps} />
      <TabsLayout tabs={TABS} activeTab={activeTab} />
      {children}
    </>
  );
}

