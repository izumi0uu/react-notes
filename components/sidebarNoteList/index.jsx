// import { getAllNotes } from "@lib/redis";
import { getAllNotes } from "@/lib/strapi";
import { sleep } from "@lib/utils";

// import SidebarNoteItem from "@components/sidebarNoteItem";
import SidebarNoteListFilter from "@/components/sidebarNoteListFilter";
import SidebarNoteItemHeader from "@/components/sidebarNoteItemHeader";

const SidebarNoteList = async () => {
  await sleep(3000);
  const notes = await getAllNotes();

  if (Object.entries(notes).length === 0)
    return <div className="notes-empty">{"No notes created yet!"}</div>;

  return (
    // <SidebarNoteListFilter>
    //   {Object.entries(notes).map(([id, note]) => {
    //     return <SidebarNoteItem noteId={id} note={JSON.parse(note)} />;
    //   })}
    // </SidebarNoteListFilter>
    <SidebarNoteListFilter
      notes={Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note);
        return {
          noteId,
          note: noteData,
          header: (
            // notice here: which is not as a JSX element, is html element
            <SidebarNoteItemHeader
              title={noteData.title}
              updateTime={noteData.updateTime}
            />
          ),
        };
      })}
    />
  );
};

export default SidebarNoteList;
