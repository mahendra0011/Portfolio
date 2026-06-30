import { FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { openInstalledApp, socialAppLinks } from "@/lib/socialAppLinks";
import ShinyText from "@/components/reactbits/ShinyText";
import "./Footer.css";

const socialLinks = [
    { Icon: FaGithub, label: "GitHub", href: "https://github.com/mahendra0011" },
    { Icon: FaLinkedin, label: "LinkedIn", ...socialAppLinks.linkedin },
    { Icon: FaTelegram, label: "Telegram", href: "https://t.me/Mahi00776" },
    { Icon: FaXTwitter, label: "X", href: "https://x.com/mahendra0011" },
    { Icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@Mahendraprajapati-bt1bd" },
    { Icon: FaInstagram, label: "Instagram", ...socialAppLinks.instagram },
];

const Footer = () => (<footer className="portfolio-footer border-t border-border/50 py-12 bg-background overflow-hidden relative">
    <div className="container flex flex-col items-center justify-center gap-8 relative z-10">
      <div className="w-full text-center" style={{ fontSize: 'clamp(3rem, 15vw, 12rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em' }}>
        <ShinyText 
          text="Mahendra" 
          speed={3} 
          delay={0} 
          color="#a0aab8" 
          shineColor="#ffffff" 
          spread={100} 
          direction="left"
        />
      </div>
      <div className="flex items-center gap-4 mt-4">
        {socialLinks.map(({ Icon, label, href, appUrl }) => (<a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} onClick={(event) => openInstalledApp(event, appUrl, href)} className="w-12 h-12 rounded-full glass flex items-center justify-center hover:text-primary hover:scale-110 transition-all text-xl">
            <Icon />
          </a>))}
      </div>
    </div>
  </footer>);

export default Footer;