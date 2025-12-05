"use client";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

export default function Editor({
  onChange,
  initialContent,
  editable,
}: {
  onChange: (content: string) => void;
  initialContent?: string;
  editable?: boolean;
}) {
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  const editor = useCreateBlockNote({
    editable: editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile: handleUpload,
  });

  const { resolvedTheme } = useTheme();

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={(editor) => {
        onChange(JSON.stringify(editor.document, null, 2));
      }}
    />
  );
}
