const Page = async (context) => {
  const { params } = await context;
  const { id } = params;
  const note = await getNote(id);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(5000);

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
