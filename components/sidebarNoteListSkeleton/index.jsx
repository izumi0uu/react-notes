import { getNotes } from "@/actions";

const SidebarNoteListSkeleton = async () => {
  const notes = await getNotes();
  return (
    <div>
      <ul className="notes-list skeleton-container">
        {Object.entries(notes).map(([id, _]) => (
          <li className="v-stack" key={id}>
            <div
              className="sidebar-note-list-item skeleton"
              style={{ height: "5em" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarNoteListSkeleton;
