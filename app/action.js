"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@lib/redis";
import { z } from "zod";

// validation pattern
const schema = z.object({
  title: z.string(),
  content: z
    .string()
    .min(1, "Please enter content")
    .max(100, "Max 100 characters"),
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function saveNote(formData) {
  const noteId = formData.get("noteId");

  const data = {
    title: formData.get("title"),
    content: formData.get("body"),
    updateTime: new Date().toISOString(),
  };

  const validated = schema.safeParse(data);
  if (!validated.success) {
    return { errors: validated.error.issues };
  }

  await sleep(1000);

  if (noteId) {
    // 更新已存在的笔记
    await updateNote(noteId, JSON.stringify(data));
    // redirect(`/note/${noteId}`);
  } else {
    // 创建新笔记
    const id = await addNote(JSON.stringify(data));
    // redirect(`/note/${id}`);
  }

  return { message: "Note saved!" };
}

export async function deleteNote(formData) {
  const noteId = formData.get("noteId");

  await delNote(noteId);
  redirect("/");
}
