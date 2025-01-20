import { Suspense } from "react";

import SiderbarNoteList from "@components/sidebarNoteList";
import EditButton from "@components/editButton";
import Logo from "@components/logo";
import SidebarSearchField from "@components/sidebarSearchField";
import SidebarNoteListSkeleton from "@components/sidebarNoteListSkeleton";
import { useTranslation } from "@app/i18n";

const Sidebar = async ({ lng }) => {
  const { t } = await useTranslation(lng);
  return (
    <>
      <section className="col sidebar">
        <Logo />
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField lng={lng} />
          <EditButton noteId={null}>{t("new")}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<SidebarNoteListSkeleton />}>
            <SiderbarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  );
};

export default Sidebar;
