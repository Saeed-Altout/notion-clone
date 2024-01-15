import { useState, useEffect } from "react";

export const useScrollTop = (threshold = 10) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      const TOP = window.scrollY;
      if (TOP > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
};
