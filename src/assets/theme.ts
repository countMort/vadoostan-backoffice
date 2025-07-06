"use client";

import { createTheme } from "@mui/material";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    cssVariables: true,
    direction: "rtl",
    typography: {
      fontFamily: "IRANSans",
    },
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // light theme colors
            primary: { main: "#1976d2" },
            background: { default: "#fff", paper: "#fff" },
            text: { primary: "#000" },
          }
        : {
            // dark theme colors
            primary: { main: "#90caf9" },
            background: { default: "#121212", paper: "#1e1e1e" },
            text: { primary: "#fff" },
          }),
    },
  });
