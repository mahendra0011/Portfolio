import { createContext, useContext, useEffect, useState } from "react";
const STORAGE_KEY = "portfolio-theme";

const ThemeContext = createContext({ theme: "light", toggle: () => { } });
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined")
            return "light";
        return localStorage.getItem(STORAGE_KEY) || "light";
    });
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);
    return (<ThemeContext.Provider value={{ theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) }}>
      {children}
    </ThemeContext.Provider>);
};
export const useTheme = () => useContext(ThemeContext);
