import NoteEditor from "@components/noteEidtor";

const Page = ({ noteId, initialTitle, initialBody }) => {
  return (
    <NoteEditor
      noteId={noteId}
      initialTitle={initialTitle}
      initialBody={initialBody}
    />
  );
};

export default Page;
