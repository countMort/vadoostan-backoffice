"use client";

import { createTheme } from "@mui/material";
import { Vazirmatn } from "next/font/google";

export const vazirmatn = Vazirmatn({
  variable: "--font-vazir",
});

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    cssVariables: true,
    direction: "rtl",
    typography: {
      fontFamily: vazirmatn.style.fontFamily,
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
