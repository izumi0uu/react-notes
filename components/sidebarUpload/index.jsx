"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function SidebarUpload() {
  const router = useRouter();
  const t = useTranslations("Basic");

  const onChange = async (e) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("something went wrong");
        return;
      }

      const data = await response.json();
      router.push(`/note/${data.uid}`);
      router.refresh();
    } catch (error) {
      console.error("something went wrong");
    }

    // 重置 file input
    e.target.value = "";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <label htmlFor="file" style={{ cursor: "pointer" }}>
        {t("upload")}
      </label>
      <input
        type="file"
        id="file"
        name="file"
        style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
        onChange={onChange}
        accept=".md"
      />
    </div>
  );
}
