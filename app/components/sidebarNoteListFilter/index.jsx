"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import SidebarNoteItem from "@components/sidebarNoteItem";

const SidebarNoteListFilter = ({ notes }) => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");

  return (
    <ul className="notes-list">
      {Object.entries(notes).map(([id, note]) => {
        const noteData = JSON.parse(note);
        if (
          !searchText ||
          (searchText && noteData?.title?.toLowerCase().includes(searchText))
        ) {
          return (
            <li key={id}>
              <SidebarNoteItem noteId={id} note={noteData} />
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};

export default SidebarNoteListFilter;
