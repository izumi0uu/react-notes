import NoteEditor from "@/components/noteEidtor";
import { getNote } from "@lib/redis";
const Page = async ({ params }) => {
  const { id } = params;
  const note = await getNote(id);

  return (
    <NoteEditor
      noteId={id}
      initialTitle={note?.title}
      initialBody={note?.body}
    />
  );
};

export default Page;
