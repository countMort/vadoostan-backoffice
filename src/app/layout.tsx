import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/store/Provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import RtlProvider from "@/components/layout/RtlProvider";
import AppThemeProvider from "@/components/layout/ThemeProvider";
import { ToastContainer } from "react-toastify";
import { vazirmatn } from "@/assets/theme";

export const metadata: Metadata = {
  title: "و دوستان بک آفیس",
  description: "توضیحات بک آفیس و دوستان",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en" className={vazirmatn.className}>
        <body className={"antialiased"}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <AppThemeProvider>
              <RtlProvider>{children}</RtlProvider>
            </AppThemeProvider>
          </AppRouterCacheProvider>
          <ToastContainer />
        </body>
      </html>
    </StoreProvider>
  );
}
