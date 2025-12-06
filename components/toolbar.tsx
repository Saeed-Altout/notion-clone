"use client";
import { useRef, useState } from "react";
import { ImageIcon, SmileIcon, XIcon } from "lucide-react";
import TextAreaAutosize from "react-textarea-autosize";

import { Doc } from "@/convex/_generated/dataModel";

import { IconPicker } from "./icon-picker";
import { Button } from "./ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useCoverImage } from "@/hooks/use-cover-image";

export function Toolbar({
  initialData,
  preview,
}: {
  initialData: Doc<"documents">;
  preview?: boolean;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(initialData.title);

  const coverImage = useCoverImage();

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
    }
  };

  const onInput = (value: string) => {
    setValue(value);
    update({ id: initialData._id, title: value || "Untitled" });
  };

  const onIconSelect = (icon: string) => {
    update({ id: initialData._id, icon });
  };

  const onIconRemove = () => {
    removeIcon({ id: initialData._id });
  };

  return (
    <div className="group relative pl-[54px]">
      {!!initialData.icon && !preview && (
        <div className="group/icon flex items-center gap-x-2 pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl transition hover:opacity-75">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            variant="outline"
            size="icon"
            className="text-muted-foreground rounded-full text-xs opacity-0 transition group-hover/icon:opacity-100"
            onClick={onIconRemove}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="pt-6 text-6xl">{initialData.icon}</p>
      )}
      <div className="flex items-center gap-x-2 py-4 opacity-0 transition-opacity group-hover:opacity-100">
        {!initialData.icon && !preview && (
          <IconPicker onChange={onIconSelect} asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground text-xs"
            >
              <SmileIcon className="h-4 w-4" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            variant="outline"
            size="sm"
            className="text-muted-foreground text-xs"
            onClick={coverImage.onOpen}
          >
            <ImageIcon className="h-4 w-4" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextAreaAutosize
          ref={inputRef}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={disableInput}
          className="resize-none bg-transparent text-5xl font-bold wrap-break-word text-[#3f3f3f] outline-none dark:text-[#cfcfcf]"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold wrap-break-word text-[#3f3f3f] outline-none dark:text-[#cfcfcf]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
}
