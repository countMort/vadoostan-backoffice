"use client"

import Script from "next/script"
/**
 * Delete it if you're still seeing this after a month, this was an alternative to the TelegramScript component
 * In case it was not working
 */
export default function TelegramScriptSimple() {
  return (
    <Script
      src="/scripts/telegram-web-app.js"
      strategy="afterInteractive"
      onLoad={() => console.log("[Telegram] Script loaded successfully")}
      onError={() => console.error("[Telegram] Failed to load script")}
    />
  )
}
