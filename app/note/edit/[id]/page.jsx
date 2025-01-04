import NoteEditor from "@components/noteEidtor";
import { getNote } from "@lib/redis";
import { sleep } from "@lib/utils";

const Page = async ({ params }) => {
  const { id } = params;
  const note = await getNote(id);

  await sleep(3000);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note--text--empty-state">
          Click a note on the left to view something!🐡🐡🐡
        </span>
      </div>
    );
  }

  return (
    <NoteEditor
      noteId={id}
      initialTitle={note.title}
      initialBody={note.content}
    />
  );
};

export default Page;
