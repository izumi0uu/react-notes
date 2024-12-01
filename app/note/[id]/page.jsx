import { getNote } from "@lib/redis";
import Note from "@components/note";

const Page = async ({ params: { id } }) => {
  const note = await getNote(id);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(5000);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }
  return <Note id={id} note={note} />;
};

export default Page;
