import { Mail, Heart } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { openInstalledApp, socialAppLinks } from "@/lib/socialAppLinks";

const socialLinks = [
    { Icon: FaGithub, label: "GitHub", href: "https://github.com/mahendra0011" },
    { Icon: FaLinkedin, label: "LinkedIn", ...socialAppLinks.linkedin },
    { Icon: Mail, label: "Mail", href: "mailto:mahendrapra0077@gmail.com" },
    { Icon: FaTelegram, label: "Telegram", href: "https://t.me/Mahi00776" },
    { Icon: FaXTwitter, label: "X", href: "https://x.com/mahendra0011" },
    { Icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@Mahendraprajapati-bt1bd" },
    { Icon: FaInstagram, label: "Instagram", ...socialAppLinks.instagram },
];

const Footer = () => (<footer className="portfolio-footer border-t border-border/50 py-8 bg-background">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
        © {new Date().getFullYear()} Mahendra Prajapati. Built with <Heart className="w-3.5 h-3.5 text-destructive fill-current"/> & React.
      </p>
      <div className="flex items-center gap-3">
        {socialLinks.map(({ Icon, label, href, appUrl }) => (<a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} onClick={(event) => openInstalledApp(event, appUrl, href)} className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-primary hover:scale-110 transition-all">
            <Icon className="w-4 h-4"/>
          </a>))}
      </div>
    </div>
  </footer>);
export default Footer;
