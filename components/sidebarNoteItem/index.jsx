import SidebarNoteItemContent from "@components/sidebarNoteItemContent";
import SidebarNoteItemHeader from "@components/sidebarNoteItemHeader";

const SidebarNoteItem = ({ noteId, note }) => {
  const { title, content = "", updateTime } = note;

  const expandedChildren = (
    <p className="sidebar-note-excerpt">
      {content?.substring(0, 20) || <i>(No content)</i>}
    </p>
  );

  return (
    <SidebarNoteItemContent
      id={noteId}
      title={title}
      expandedChildren={expandedChildren}
    >
      <SidebarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  );
};

export default SidebarNoteItem;
