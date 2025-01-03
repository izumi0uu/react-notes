import SidebarNoteItem from "@/app/components/sidebarNoteItem";
import { getAllNotes } from "@lib/redis";

const SidebarNoteList = async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(3000);
  const notes = await getAllNotes();

  const arr = Object.entries(notes).filter(([_, note]) => note);

  if (!arr.length)
    return <div className="notes-empty">No notes created yet!</div>;

  return (
    <ul className="notes-list">
      {arr.map(([noteId, note]) => {
        return (
          <li key={noteId}>
            <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarNoteList;
