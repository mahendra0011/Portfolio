import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Sparkles, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { handleHashLinkClick } from "@/lib/scrollToHash";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
  { name: "Resume", href: "/resume", button: true },
];

const themeIcons = {
  dark: <Sun className="h-5 w-5" />,
  bento: <Sparkles className="h-5 w-5 text-slate-300" />,
};

const themeLabels = {
  dark: "Switch to Bento",
  bento: "Switch to Dark",
};

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
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30);
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return (<motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.28 }} className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 transition-all duration-200 sm:top-4 sm:px-4">
    <nav className={`pointer-events-auto mx-auto flex h-14 w-full max-w-[calc(100vw-1.5rem)] items-center justify-between rounded-full px-4 glass sm:h-16 sm:max-w-6xl sm:px-6 ${scrolled ? "shadow-elegant" : ""}`}>
      <a href={isHomePage ? "#home" : "/"} onClick={(event) => handleLinkClick(event, "#home")} className="text-base font-bold text-foreground sm:text-xl">{'<'}Mahendra /{'>'}</a>
      <ul className="hidden items-center gap-4 xl:flex 2xl:gap-6">
        {links.map((l) => (<li key={l.name}>
          <a href={resolveHref(l.href)} onClick={(event) => handleLinkClick(event, l.href)} className={`text-sm font-medium transition-colors relative group ${l.button ? "rounded-md gradient-bg px-3 py-2 text-foreground shadow-glow hover:scale-105" : "text-muted-foreground hover:text-foreground"}`}>
            {l.name}
            {!l.button && <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-bg group-hover:w-full transition-all duration-180" />}
          </a>
        </li>))}
      </ul>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggle} aria-label={themeLabels[theme]}>
          {themeIcons[theme]}
        </Button>
        <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
    </nav>
    {open && (<motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="pointer-events-auto mx-auto mt-2 max-h-[calc(100svh-6rem)] w-full max-w-[calc(100vw-1.5rem)] space-y-3 overflow-y-auto rounded-2xl px-5 py-4 glass sm:max-w-6xl sm:px-6 xl:hidden">
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