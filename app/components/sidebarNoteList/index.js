"use client";

import dayjs from "dayjs";

const SidebarNoteList = async ({ notes }) => {
  const arr = Object.entries(notes);

  if (!arr.length)
    return <div className="notes-empty">No notes created yet!</div>;

  return (
    <ul className="notes-list">
      {arr.map(([noteId, note]) => {
        const { title, updateTime } = JSON.parse(note);
        return (
          <li key={noteId}>
            <header className="sidebar-note-header">
              <strong>{title}</strong>
              <small>{dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}</small>
            </header>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarNoteList;
