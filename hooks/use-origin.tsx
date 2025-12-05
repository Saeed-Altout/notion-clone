import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const origin =
    typeof window !== "undefined" && typeof window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return "";
  }

  return origin;
};
