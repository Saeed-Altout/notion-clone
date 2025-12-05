"use client";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";

export function Editor({
  onChange,
  initialContent,
  editable,
}: {
  onChange: (content: string) => void;
  initialContent?: string;
  editable?: boolean;
}) {
  const editor = useCreateBlockNote({
    editable: editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
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
