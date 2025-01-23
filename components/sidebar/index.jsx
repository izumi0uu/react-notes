import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import SiderbarNoteList from "@/components/sidebarNoteList";
import EditButton from "@/components/editButton";
import Logo from "@/components/logo";
import SidebarSearchField from "@/components/sidebarSearchField";
import SidebarNoteListSkeleton from "@/components/sidebarNoteListSkeleton";
import SidebarUpload from "@/components/sidebarUpload";

const Sidebar = async () => {
  const t = await getTranslations("Basic");
  return (
    <>
      <section className="col sidebar">
        <Logo />
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField />
          <EditButton noteId={null}>{t("new")}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<SidebarNoteListSkeleton />}>
            <SiderbarNoteList />
          </Suspense>
          <SidebarUpload />
        </nav>
      </section>
    </>
  );
};

export default Sidebar;
