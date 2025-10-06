// Cookie utility functions
export const cookieUtils = {
  // Set a cookie with expiration
  setCookie: (name: string, value: string, days: number = 7): void => {
    if (typeof document !== "undefined") {
      const expires = new Date()
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`
    }
  },

  // Get a cookie value
  getCookie: (name: string): string | null => {
    if (typeof document !== "undefined") {
      const nameEQ = name + "="
      const ca = document.cookie.split(";")
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === " ") c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
      }
    }
    return null
  },

  // Remove a cookie
  removeCookie: (name: string): void => {
    if (typeof document !== "undefined") {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
    }
  },
}
