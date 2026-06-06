import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { handleHashLinkClick } from "@/lib/scrollToHash";
const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
    { name: "Resume", href: "/resume", button: true },
];
const Navbar = () => {
    const { theme, toggle } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const isHomePage = typeof window === "undefined" || window.location.pathname === "/";
    const resolveHref = (href) => href.startsWith("#") && !isHomePage ? `/${href}` : href;
    const handleLinkClick = (event, href) => {
        if (isHomePage) {
            handleHashLinkClick(event, href);
        }
    };
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (<motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 transition-all duration-300">
      <nav className={`pointer-events-auto mx-auto flex h-16 w-full max-w-[358px] items-center justify-between rounded-full px-6 glass sm:max-w-6xl ${scrolled ? "shadow-elegant" : ""}`}>
        <a href={isHomePage ? "#home" : "/"} onClick={(event) => handleLinkClick(event, "#home")} className="text-xl font-bold text-foreground">&lt;Mahendra /&gt;</a>
        <ul className="hidden lg:flex items-center gap-6">
          {links.map((l) => (<li key={l.name}>
              <a href={resolveHref(l.href)} onClick={(event) => handleLinkClick(event, l.href)} className={`text-sm font-medium transition-colors relative group ${l.button ? "rounded-md gradient-bg px-3 py-2 text-foreground shadow-glow hover:scale-105" : "text-muted-foreground hover:text-foreground"}`}>
                {l.name}
                {!l.button && <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-bg group-hover:w-full transition-all duration-300"/>}
              </a>
            </li>))}
        </ul>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
          </Button>
        </div>
      </nav>
      {open && (<motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pointer-events-auto mx-auto mt-2 w-full max-w-[358px] space-y-3 rounded-2xl px-6 py-4 glass sm:max-w-6xl lg:hidden">
          {links.map((l) => (<li key={l.name}>
              <a href={resolveHref(l.href)} onClick={(event) => {
                handleLinkClick(event, l.href);
                setOpen(false);
              }} className={`block py-2 text-sm font-medium ${l.button ? "rounded-md gradient-bg px-3 text-center text-foreground shadow-glow" : ""}`}>
                {l.name}
              </a>
            </li>))}
        </motion.ul>)}
    </motion.header>);
};
export default Navbar;
