import { Mail, Heart } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaXTwitter, FaYoutube } from "react-icons/fa6";
const Footer = () => (<footer className="border-t border-border/50 py-8 bg-background">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
        © {new Date().getFullYear()} Mahendra Prajapati. Built with <Heart className="w-3.5 h-3.5 text-destructive fill-current"/> & React.
      </p>
      <div className="flex items-center gap-3">
        {[
        { Icon: FaGithub, href: "https://github.com/mahendra0011" },
        { Icon: FaLinkedin, href: "https://www.linkedin.com/in/mahendra-prajapati-73163930b" },
        { Icon: FaXTwitter, href: "https://x.com/mahendra0011" },
        { Icon: FaYoutube, href: "https://www.youtube.com/@mahendra0011" },
        { Icon: FaTelegram, href: "https://t.me/mahendra0011" },
        { Icon: Mail, href: "mailto:mahendrapra0077@gmail.com" },
        { Icon: FaInstagram, href: "https://www.instagram.com/mahendra0011" },
    ].map(({ Icon, href }, i) => (<a key={i} href={href} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-primary hover:scale-110 transition-all">
            <Icon className="w-4 h-4"/>
          </a>))}
      </div>
    </div>
  </footer>);
export default Footer;
