import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Download, Mail, FolderGit2, Code2, Rocket } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.png";

const roles = [
  "Software Developer",
  "Full Stack Developer",
  "React Enthusiast",
  "Electronics & Communication Student",
];

const socialLinks = [
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/mahendra0011" },
  { Icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mahendra-prajapati-73163930b" },
  { Icon: FaXTwitter, label: "X", href: "https://x.com/mahendra0011" },
  { Icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@mahendra0011" },
  { Icon: FaTelegram, label: "Telegram", href: "https://t.me/mahendra0011" },
  { Icon: Mail, label: "Mail", href: "mailto:mahendrapra0077@gmail.com" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/mahendra0011" },
];

const heroStats = [
  { label: "Projects Built", value: "10+" },
  { label: "GitHub Commits", value: "900+" },
  { label: "Core Tech", value: "50+" },
];

const Typewriter = () => {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = roles[i % roles.length];
    const timer = setTimeout(() => {
      if (!del) {
        setText(current.slice(0, text.length + 1));
        if (text === current) setTimeout(() => setDel(true), 1500);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text === "") {
          setDel(false);
          setI(i + 1);
        }
      }
    }, del ? 50 : 90);

    return () => clearTimeout(timer);
  }, [text, del, i]);

  return (
    <span className="gradient-text">
      {text}
      <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle animate-blink" />
    </span>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center hero-bg overflow-hidden pt-20">
      <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
        {socialLinks.map(({ Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            className="w-11 h-11 rounded-full glass flex items-center justify-center hover:text-primary hover:scale-110 transition-all shadow-elegant"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>

      <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-primary/30 blur-3xl animate-blob" />
      <div className="absolute bottom-10 -right-10 w-96 h-96 rounded-full bg-accent/30 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />

      <div className="container grid lg:grid-cols-2 gap-12 items-center relative z-10 py-12 xl:pl-24">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for opportunities
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
            Hi, I'm <span className="block sm:inline gradient-text">Mahendra</span>
            <br />
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-semibold">
              I'm a <Typewriter />
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            B.Tech Electronics & Communication student from Jabalpur (M.P.) passionate about building
            real-world full-stack applications. I craft scalable MERN experiences using React, Node.js,
            Express and MongoDB.
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-xl">
            {heroStats.map((item) => (
              <div key={item.label} className="glass rounded-2xl px-3 py-3 sm:px-4">
                <div className="text-xl sm:text-2xl font-bold gradient-text">{item.value}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button size="lg" asChild className="w-full gradient-bg shadow-glow hover:scale-105 transition-transform sm:w-auto">
              <a href="#projects">
                <FolderGit2 className="mr-2 h-4 w-4" /> View Projects
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full hover:scale-105 transition-transform sm:w-auto">
              <a href="#contact">
                <Mail className="mr-2 h-4 w-4" /> Contact Me
              </a>
            </Button>
            <Button size="lg" variant="secondary" asChild className="w-full hover:scale-105 transition-transform sm:w-auto">
              <a href="/Mahendra_Resume.pdf" download>
                <Download className="mr-2 h-4 w-4" /> Resume
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 lg:hidden">
            {socialLinks.map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ y: -4, scale: 1.1 }}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-primary transition-colors"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[440px]">
            <div className="absolute inset-x-10 top-14 h-72 rounded-[999px] bg-primary/25 blur-3xl opacity-50" />
            <div className="relative mx-auto h-[500px] w-[300px] sm:h-[540px] sm:w-[340px] lg:h-[590px] lg:w-[390px] animate-float">
              <div className="absolute inset-x-3 bottom-5 top-12 overflow-hidden rounded-[2.25rem] border border-primary/20 bg-[linear-gradient(180deg,hsl(43_86%_94%),hsl(39_78%_89%)_58%,hsl(186_50%_86%))] shadow-[0_30px_90px_-42px_rgba(8,47,73,0.7)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.75),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.36),transparent_55%)]" />
                <div className="absolute inset-x-10 bottom-0 h-24 rounded-t-full bg-primary/20 blur-2xl" />
              </div>
              <img
                src={profileImg}
                alt="Mahendra Prajapati portrait"
                className="absolute inset-0 z-10 h-full w-full object-contain object-bottom drop-shadow-[0_34px_48px_rgba(15,23,42,0.45)]"
              />
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute left-5 top-24 rounded-2xl border border-primary/20 bg-background/85 px-4 py-2 shadow-elegant backdrop-blur-xl">
              <Code2 className="w-5 h-5 text-primary" />
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-24 right-3 rounded-2xl border border-primary/20 bg-background/85 px-4 py-2 shadow-elegant backdrop-blur-xl">
              <Rocket className="w-5 h-5 text-primary" />
            </motion.div>
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-2xl border border-primary/20 bg-background/90 px-4 py-2 text-xs font-semibold shadow-elegant backdrop-blur-xl">
              MERN Stack
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
