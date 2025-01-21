"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import Button from "@/components/Button";

export default function SidebarNoteContent({
  id,
  title,
  children,
  expandedChildren,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const selectedId = pathname?.split("/")[1] || null;

  const [isPending] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = id === selectedId;

  // Animate after title is edited.
  const itemRef = useRef(null);
  const prevTitleRef = useRef(title);

  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      itemRef.current.classList.add("flash");
    }
  }, [title]);

  const getClassName = () => {
    return ["sidebar-note-list-item", isExpanded ? "note-expanded" : ""].join(
      " "
    );
  };

  const getBtnBackgroundColor = () => {
    return isPending
      ? "var(--gray-80)"
      : isActive
      ? "var(--tertiary-blue)"
      : "";
  };

  const getBtnBorder = () => {
    return isActive
      ? "1px solid var(--primary-border)"
      : "1px solid transparent";
  };

  const onClickOpenBtn = () => {
    const sidebarToggle = document.getElementById("sidebar-toggle");
    if (sidebarToggle) {
      sidebarToggle.checked = true;
    }
    router.push(`/note/${id}`);
  };

  const onClickToggleExpandBtn = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.current.classList.remove("flash");
      }}
      className={getClassName()}
    >
      {children}
      <Button
        className="sidebar-note-open"
        style={{
          backgroundColor: getBtnBackgroundColor(),
          border: getBtnBorder(),
        }}
        onClick={onClickOpenBtn}
      >
        Open note for preview
      </Button>
      <Button
        className="sidebar-note-toggle-expand"
        onClick={onClickToggleExpandBtn}
      >
        {isExpanded ? (
          <img
            src="/chevron-down.svg"
            width="10px"
            height="10px"
            alt="Collapse"
          />
        ) : (
          <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
      </Button>
      {isExpanded && expandedChildren}
    </div>
  );
}
