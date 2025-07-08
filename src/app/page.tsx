"use client";

import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram: any;
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();

      tg.expand();
      setUser(tg.initDataUnsafe.user);
    }
  }, []);

  return (
    <div className="p-4 text-center h-[100vh] flex items-center justify-center flex-col">
      <Typography fontSize={14}>سلام {user?.first_name} 👋</Typography>
      <Button component={Link} href="/create">
        ساخت تجربه جدید
      </Button>
    </div>
  );
}
