"use client";

import { getTheme } from "@/assets/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode, useEffect, useMemo, useState } from "react";

export default function AppThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setMode(mediaQuery.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", (e) =>
      setMode(e.matches ? "dark" : "light")
    );
  }, []);
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
