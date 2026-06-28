import { createContext, useContext, useEffect, useState } from "react";
const STORAGE_KEY = "portfolio-theme";

const THEME_ORDER = ["dark", "bento"];

const ThemeContext = createContext({ theme: "bento", toggle: () => { } });
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined")
            return "bento";
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        if (savedTheme && THEME_ORDER.includes(savedTheme)) {
            return savedTheme;
        }
        return "bento";
    });
    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("dark", "bento", "light");
        root.classList.add(theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);
    const toggle = () => {
        setTheme((t) => {
            const idx = THEME_ORDER.indexOf(t);
            return THEME_ORDER[(idx + 1) % THEME_ORDER.length];
        });
    };
    return (<ThemeContext.Provider value={{ theme, toggle }}>
        {children}
    </ThemeContext.Provider>);
};
export const useTheme = () => useContext(ThemeContext);