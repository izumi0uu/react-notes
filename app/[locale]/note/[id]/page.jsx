import { getNote } from "@lib/redis";
import Note from "@/components/note";
import { sleep } from "@lib/utils";

const Page = async ({ params }) => {
  const { id } = await params;
  const note = await getNote(id);

  // await sleep(4000);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }
  return <Note noteId={id} note={note} />;
};

export default Page;
