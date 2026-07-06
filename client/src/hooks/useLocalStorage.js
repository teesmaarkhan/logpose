import { useEffect, useState } from "react";

const STORAGE_PREFIX = "dotcompiler:";

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_PREFIX + key);

      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue];
}
