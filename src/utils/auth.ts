const TOKEN_KEY = "token";
const USER_KEY = "auth_user";

// Cookie helper functions
const setCookie = (name: string, value: string, days: number = 2): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const tokenHelpers = {
  getToken(): string | null {
    return getCookie(TOKEN_KEY);
  },

  setToken(token: string): void {
    setCookie(TOKEN_KEY, token, 2); // 2 days expiry
  },

  removeToken(): void {
    deleteCookie(TOKEN_KEY);
  },

  getUser<T>(): T | null {
    const userStr = getCookie(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(decodeURIComponent(userStr)) as T;
    } catch {
      return null;
    }
  },

  setUser<T>(user: T): void {
    setCookie(USER_KEY, encodeURIComponent(JSON.stringify(user)), 2);
  },

  removeUser(): void {
    deleteCookie(USER_KEY);
  },

  clearAuth(): void {
    this.removeToken();
    this.removeUser();
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
