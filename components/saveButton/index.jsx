import { useFormStatus } from "react-dom";

const SaveButton = ({ formAction }) => {
  const { pending } = useFormStatus();
  return (
    <button
      className="note-editor-done"
      type="submit"
      formAction={formAction}
      disabled={pending}
      role="menuitem"
    >
      <img
        src="/checkmark.svg"
        width="14px"
        height="10px"
        alt=""
        role="presentation"
      />
      {pending ? "Saving" : "Done"}
    </button>
  );
};

export default SaveButton;
