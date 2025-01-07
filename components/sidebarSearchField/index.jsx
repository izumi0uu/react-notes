"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

const Spinner = ({ active = true }) => {
  return (
    <div
      className={`spinner ${active ? "spinner-active" : ""}`}
      role="status"
      aria-busy={active ? "true" : "false"}
    />
  );
};

const SidebarSearchField = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  // useTransition is suitable for this case because it allows us to update the URL without blocking the UI
  const [isPending, startTransition] = useTransition();

  function handleSearch(term) {
    const params = new URLSearchParams(window.location.search);

    if (term) params.set("q", term);
    else params.delete("q");

    // router update is marked as non-urgent, is low priority task
    // when url is updated, the note list re-render is marked as non-blocking operation
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="search" role="search">
      <label className="offscreen" htmlFor="sidebar-search-input">
        Search for a note by title
      </label>
      <input
        type="text"
        id="sidebar-search-input"
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Spinner active={isPending} />
    </div>
  );
};

export default SidebarSearchField;
