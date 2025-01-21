"use client";

import { useSearchParams } from "next/navigation";
// import { Children } from "react";
import SidebarNoteItemContent from "@/components/sidebarNoteItemContent";

// const SidebarNoteListFilter = ({ children }) => {
//   const searchParams = useSearchParams();
//   const searchText = searchParams.get("q");

//   return (
//     <ul className="notes-list">
//       {Children.map(children, (child, index) => {
//         const title = child.props.title;
//         if (
//           !searchText ||
//           (searchText && title.toLowerCase().includes(searchText.toLowerCase()))
//         ) {
//           return <li key={index}>{child}</li>;
//         }
//         return null;
//       })}
//     </ul>
//   );
// };

const SidebarNoteListFilter = ({ notes }) => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");

  return (
    <ul className="notes-list">
      {notes.map((noteItem) => {
        const { noteId, note, header } = noteItem;
        if (
          !searchText ||
          (searchText &&
            note.title.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          return (
            <li className="v-stack" key={noteId}>
              <SidebarNoteItemContent
                key={noteId}
                id={noteId}
                title={note.title}
                expandedChildren={
                  <p className="sidebar-note-excerpt">
                    {note.content.substring(0, 20) || <i>(No content)</i>}
                  </p>
                }
              >
                {header}
              </SidebarNoteItemContent>
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};

export default SidebarNoteListFilter;
