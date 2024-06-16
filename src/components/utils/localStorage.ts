export const saveToLocal = <T>(key: string, data: T) => {
  if (typeof window !== "undefined")
    localStorage.setItem(key, JSON.stringify(data));
};

export const loadFromLocalStorage = <T>(key: string): T | null => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
};
