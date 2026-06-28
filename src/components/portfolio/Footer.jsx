import { FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { openInstalledApp, socialAppLinks } from "@/lib/socialAppLinks";
import GlitchText from "@/components/GlitchText";

const socialLinks = [
    { Icon: FaGithub, label: "GitHub", href: "https://github.com/mahendra0011" },
    { Icon: FaLinkedin, label: "LinkedIn", ...socialAppLinks.linkedin },
    { Icon: FaTelegram, label: "Telegram", href: "https://t.me/Mahi00776" },
    { Icon: FaXTwitter, label: "X", href: "https://x.com/mahendra0011" },
    { Icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@Mahendraprajapati-bt1bd" },
    { Icon: FaInstagram, label: "Instagram", ...socialAppLinks.instagram },
];

const Footer = () => (<footer className="portfolio-footer border-t border-border/50 py-8 bg-background">
    <div className="container flex flex-col items-center justify-center gap-6">
      <GlitchText speed={0.6} enableShadows={false} enableOnHover={true} className="glitch-footer glitch-grey">Mahendra</GlitchText>
      <div className="flex items-center gap-3">
        {socialLinks.map(({ Icon, label, href, appUrl }) => (<a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} onClick={(event) => openInstalledApp(event, appUrl, href)} className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-primary hover:scale-110 transition-all">
            <Icon className="w-4 h-4"/>
          </a>))}
      </div>
    </div>
  </footer>);
export default Footer;