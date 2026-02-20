"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) setTheme(saved);
      else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      console.debug && console.debug(`theme -> ${theme}`);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeContext;
