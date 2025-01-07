"use client";
import { useEffect, useState } from "react";

export const detectMdBreakpoint = () => {
  const [isMd, setIsMd] = useState(null);

  const handleChange = (e) => {
    setIsMd(e.matches);
  };

  useEffect(() => {
    const match = window.matchMedia("(min-width: 768px)");
    setIsMd(match.matches);
    match.addEventListener("change", handleChange);

    return () => match.removeEventListener("change", handleChange);
  }, []);

  return isMd;
};
