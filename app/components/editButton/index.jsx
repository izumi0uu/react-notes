import Link from "next/link";

const EditButton = ({ noteId, children }) => {
  const isDraft = noteId === null;

  console.log("noteId", noteId);

  const getClassName = () => {
    return [
      "edit-button",
      isDraft ? "edit-button--solid" : "edit-button--outline",
    ].join(" ");
  };

  return (
    <Link href={`/note/edit/${noteId || ""}`} className="link-unstyled">
      <button className={getClassName()} role="menuitem">
        {children}
      </button>
    </Link>
  );
};

export default EditButton;
