"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@lib/redis";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function saveNote(formData) {
  const noteId = formData.get("noteId");

  const data = JSON.stringify({
    title: formData.get("title"),
    content: formData.get("body"),
    updateTime: new Date().toISOString(),
  });

  await sleep(1000);

  if (noteId) {
    // 更新已存在的笔记
    await updateNote(noteId, data);
    // redirect(`/note/${noteId}`);
  } else {
    // 创建新笔记
    const id = await addNote(data);
    redirect(`/note/${id}`);
  }

  return { message: "Note saved!" };
}

export async function deleteNote(formData) {
  const noteId = formData.get("noteId");

  await delNote(noteId);
  redirect("/");
}
