import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Certifications", href: "#certifications" },
    { name: "Resume", href: "#resume" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
];
const Navbar = () => {
    const { theme, toggle } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (<motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-elegant" : "bg-transparent"}`}>
      <nav className="container flex items-center justify-between h-16">
        <a href="#home" className="text-xl font-bold gradient-text">&lt;Mahendra /&gt;</a>
        <ul className="hidden lg:flex items-center gap-6">
          {links.map((l) => (<li key={l.name}>
              <a href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group">
                {l.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-bg group-hover:w-full transition-all duration-300"/>
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
      {open && (<motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden glass border-t border-border/50 px-6 py-4 space-y-3">
          {links.map((l) => (<li key={l.name}>
              <a href={l.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium">
                {l.name}
              </a>
            </li>))}
        </motion.ul>)}
    </motion.header>);
};
export default Navbar;
