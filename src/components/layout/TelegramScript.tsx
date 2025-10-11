"use client"

import Script from "next/script"
import { useState, useEffect } from "react"

export default function TelegramScript() {
  const [useLocalScript, setUseLocalScript] = useState(false)
  const [externalScriptLoaded, setExternalScriptLoaded] = useState(false)

  const handleExternalError = () => {
    console.warn(
      "[TelegramScript] Failed to load external script, falling back to local version"
    )
    setUseLocalScript(true)
  }

  const handleExternalLoad = () => {
    console.log("[TelegramScript] External script loaded successfully")
    setExternalScriptLoaded(true)
  }

  // Timeout fallback: if external script takes too long, switch to local
  useEffect(() => {
    if (useLocalScript || externalScriptLoaded) {
      return // Already handled
    }

    const timeoutId = setTimeout(() => {
      if (typeof window !== "undefined" && typeof window.Telegram === "undefined") {
        console.warn(
          "[TelegramScript] External script timeout (5s), falling back to local version"
        )
        setUseLocalScript(true)
      }
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [useLocalScript, externalScriptLoaded])

  return (
    <>
      {/* Try loading external script first */}
      {!useLocalScript && (
        <Script
          src="https://telegram.org/js/telegram-web-app.js?59"
          strategy="afterInteractive"
          onLoad={handleExternalLoad}
          onError={handleExternalError}
        />
      )}

      {/* Fallback to local script if external fails or times out */}
      {useLocalScript && (
        <Script
          src="/scripts/telegram-web-app.js"
          strategy="afterInteractive"
          onLoad={() =>
            console.log("[TelegramScript] Local script loaded successfully")
          }
          onError={() =>
            console.error("[TelegramScript] Failed to load local script")
          }
        />
      )}
    </>
  )
}

