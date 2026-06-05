import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext({ theme: "dark", toggle: () => { } });
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined")
            return "dark";
        return localStorage.getItem("theme") || "dark";
    });
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);
    return (<ThemeContext.Provider value={{ theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) }}>
      {children}
    </ThemeContext.Provider>);
};
export const useTheme = () => useContext(ThemeContext);
