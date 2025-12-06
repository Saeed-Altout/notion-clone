"use client";

import {
  ChevronsLeftIcon,
  MenuIcon,
  PlusCircleIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { UserItem } from "./user-item";
import { Item } from "./item";
import { DocumentList } from "./document-list";
import { TrashBox } from "./trash-box";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { useSearchStore } from "@/hooks/use-search-store";
import { useSettingsStore } from "@/hooks/use-settings";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Navbar } from "./navbar";

export function Navigation() {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isMobile);

  const create = useMutation(api.documents.create);
  const search = useSearchStore((state) => state.toggle);
  const settings = useSettingsStore();

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) => {
      router.push(`/documents/${documentId}`);
    });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note",
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = true;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`,
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)",
      );

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  }, [setIsCollapsed, setIsResetting, isMobile]);

  const collapse = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("left", "0");
      navbarRef.current.style.setProperty("width", "100%");

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  }, [setIsCollapsed, setIsResetting]);

  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
        collapse();
      }, 300);
    } else {
      setTimeout(() => {
        resetWidth();
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
        collapse();
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, pathname]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar bg-sidebar relative z-40 flex h-full w-60 flex-col overflow-y-auto",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "w-0",
        )}
      >
        <div
          role="button"
          className={cn(
            "text-muted-foreground absolute top-4 right-3 z-50 flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm opacity-0 transition group-hover/sidebar:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600",
            isMobile && "opacity-100",
          )}
          onClick={collapse}
        >
          <ChevronsLeftIcon className="h-4 w-4" />
        </div>
        <div>
          <UserItem />
          <Item label="Search" icon={SearchIcon} isSearch onClick={search} />
          <Item
            label="Settings"
            icon={SettingsIcon}
            onClick={settings.onOpen}
          />
          <Item onClick={onCreate} label="New page" icon={PlusCircleIcon} />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Item onClick={onCreate} label="Add a page" icon={PlusIcon} />
          <Popover>
            <PopoverTrigger className="mt-4 w-full">
              <Item label="Trash" icon={TrashIcon} onClick={() => {}} />
            </PopoverTrigger>
            <PopoverContent side={isMobile ? "bottom" : "right"}>
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          className="bg-primary/10 absolute top-0 right-0 h-full w-1 cursor-ew-resize opacity-0 transition-opacity group-hover/sidebar:opacity-100"
          onClick={resetWidth}
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 left-60 z-50 w-[calc(100%-240px)]",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "left-0 w-full",
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="h-full bg-transparent px-3 py-2">
            {isCollapsed && (
              <MenuIcon
                role="button"
                className="text-muted-foreground h-4 w-4"
                onClick={resetWidth}
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
}
