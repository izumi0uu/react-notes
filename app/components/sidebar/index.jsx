import { getAllNotes } from "@lib/redis";
import SiderbarNoteList from "@components/sidebarNoteList";
import EditButton from "@components/editButton";
import Logo from "@components/logo";

const Sidebar = async () => {
  const notes = await getAllNotes();

  return (
    <>
      <section className="col sidebar">
        <Logo />
        <section className="sidebar-menu" role="menubar">
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          <SiderbarNoteList notes={notes} />
        </nav>
      </section>
    </>
  );
};

export default Sidebar;
