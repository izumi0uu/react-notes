import { stat, mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import mime from "mime";
import dayjs from "dayjs";
import { addNote } from "@/lib/redis";
import { auth } from "@/auth";

export async function POST(request) {
  const session = await auth();
  // accept formData
  const formData = await request.formData();
  const file = formData.get("file");

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!file)
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  // write file to disk
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dayjs().format("YY-MM-DD")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (error) {
    if (error.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to create upload directory" },
        { status: 500 }
      );
    }
  }

  try {
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const filename = file.name.replace(/\.[^.]+$/, "");
    const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(
      file.type
    )}`;
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);

    const res = await addNote(
      JSON.stringify({
        title: uniqueFilename,
        content: buffer.toString("utf-8"),
      })
    );

    revalidatePath("/", "layout");

    return NextResponse.json({
      fileUrl: `${relativeUploadDir}/${uniqueFilename}`,
      uid: res,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create upload directory" },
      { status: 500 }
    );
  }
}
