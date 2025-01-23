"use client";

import React, { Suspense } from "react";
import Button from "@/components/button";

const SidebarUpload = () => {
  return (
    <form method="post" encType="mutipart/form-data">
      <div style={{ textAlign: "center" }}>
      <Button
        className="sidebar-note-open"
        style={{
          backgroundColor: getBtnBackgroundColor(),
          border: getBtnBorder(),
        }}
      >
        Open note for preview
      </Button>
      </div>
    </form>
  );
};

export default SidebarUpload;
