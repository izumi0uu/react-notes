import { getAllNotes, resetDatabase } from "@lib/redis";
import { sleep } from "@lib/utils";

import SidebarNoteListFilter from "@components/sidebarNoteListFilter";

const SidebarNoteList = async () => {
  await sleep(3000);
  const notes = await getAllNotes();
  if (Object.entries(notes).length == 0)
    return <div className="notes-empty">{"No notes created yet!"}</div>;

  return <SidebarNoteListFilter notes={notes} />;
};

export default SidebarNoteList;
