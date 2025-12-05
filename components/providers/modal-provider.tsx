"use client";

import { useState, useEffect } from "react";

import { SettingsModal } from "../modals/settings-modal";
import { CoverImageModal } from "../modals/cover-image-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
}
