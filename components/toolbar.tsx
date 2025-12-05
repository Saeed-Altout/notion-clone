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
    <div className="pl-[54px] relative group">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            onClick={onIconRemove}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-x-2 py-4">
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
          className="text-5xl font-bold bg-transparent wrap-break-word outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold wrap-break-word outline-none text-[#3f3f3f] dark:text-[#cfcfcf]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
}
