import sanitizeHtml from "sanitize-html";

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  "h1",
  "h2",
  "h3",
  "img",
]);

const allowedAttributes = Object.assign(
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ["src", "alt"],
  }
);

const NotePreview = ({ children }) => {
  return (
    <div className="note-preview">
      <div
        className="text-with-markdown"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(children || "", {
            allowedTags,
            allowedAttributes,
          }),
        }}
      />
    </div>
  );
};

export default NotePreview;
