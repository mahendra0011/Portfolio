import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border/60 transition-all duration-300 ${
        scrolled ? "bg-card/95 shadow-elegant backdrop-blur-xl" : "bg-card/80 backdrop-blur-lg"
      }`}
    >
      <nav className="container flex h-16 items-center justify-between">
        <a href="#home" className="text-xl font-bold text-foreground">
          Mahendra<span className="text-primary">.</span>
        </a>

        <ul className="hidden items-center gap-4 xl:flex">
          {links.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {link.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:hidden border-t border-border/60 bg-card/95 px-6 py-4 backdrop-blur-xl"
        >
          {links.map((link) => (
            <li key={link.name}>
              <a href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary/70">
                {link.name}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </header>
  );
};

export default Navbar;
