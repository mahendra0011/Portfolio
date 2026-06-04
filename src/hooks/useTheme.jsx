import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext({ theme: "light", toggle: () => { } });
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);
    return (<ThemeContext.Provider value={{ theme, toggle: () => setTheme("light") }}>
      {children}
    </ThemeContext.Provider>);
};
export const useTheme = () => useContext(ThemeContext);
