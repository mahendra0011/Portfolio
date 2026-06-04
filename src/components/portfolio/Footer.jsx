import { Github, Heart, Linkedin, Mail } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

const links = [
  { Icon: Github, href: "https://github.com/mahendra0011", label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/mahendra-prajapati-73163930b", label: "LinkedIn" },
  { Icon: SiLeetcode, href: "https://leetcode.com/u/mahendra_0011/", label: "LeetCode" },
  { Icon: Mail, href: "mailto:mahendrapra0077@gmail.com", label: "Email" },
];

const Footer = () => (
  <footer className="border-t border-border/60 bg-card/80 py-8">
    <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
      <p className="flex items-center gap-1.5 text-center text-sm text-muted-foreground">
        Copyright {new Date().getFullYear()} Mahendra Prajapati. Built with
        <Heart className="h-3.5 w-3.5 fill-current text-destructive" />
        React.
      </p>
      <div className="flex items-center gap-3">
        {links.map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/65 bg-card/80 text-muted-foreground transition-all hover:scale-105 hover:text-primary"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
