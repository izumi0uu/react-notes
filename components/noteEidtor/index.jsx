"use client";

import { useState, useCallback, useActionState, useEffect } from "react";

import { saveNote, deleteNote } from "@/actions";
import SaveButton from "@/components/saveButton";
import DeleteButton from "@/components/deleteButton";
import NotePreview from "@/components/notePreview";

const initialState = {
  message: "",
};

const NoteEditor = ({ noteId, initialTitle, initialBody }) => {
  const [title, setTitle] = useState(initialTitle || "");
  const [body, setBody] = useState(initialBody || "");

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleBodyChange = useCallback((e) => {
    setBody(e.target.value);
  }, []);

  // according to the form action result, update the state
  const [saveState, saveFormAction] = useActionState(
    async (prevState, formData) => {
      return await saveNote(formData);
    },
    initialState
  );

  const [deleteState, deleteFormAction] = useActionState(
    async (prevState, formData) => {
      return await deleteNote(formData);
    },
    initialState
  );

  useEffect(() => {
    if (saveState.errors) {
      // 处理错误
      console.log(saveState.errors);
    }
  }, [saveState]);

  const isDraft = !noteId;

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <div className="note-editor-menu" role="menubar">
          <input type="hidden" name="noteId" value={noteId} />
          <SaveButton formAction={saveFormAction} />
          <DeleteButton isDraft={isDraft} formAction={deleteFormAction} />
        </div>
        <div className="note-editor-menu">
          {saveState?.message}
          {saveState.errors && saveState.errors[0].message}
        </div>

        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          name="body"
          value={body}
          id="note-body-input"
          onChange={handleBodyChange}
        />
      </form>
      <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  );
};

export default NoteEditor;
