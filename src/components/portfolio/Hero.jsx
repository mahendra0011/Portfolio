import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Download, Mail, FolderGit2 } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

const roles = [
  "React developer",
  "Software Developer",
  "Full Stack Developer",
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

const Typewriter = () => {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const current = roles[roleIndex];
    const isTyping = phase === "typing";
    const isDeleting = phase === "deleting";
    const delay = isTyping ? 85 : isDeleting ? 42 : 1200;

    const timer = setTimeout(() => {
      if (isTyping) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setPhase("holding");
        }
        return;
      }

      if (isDeleting) {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          setRoleIndex((index) => (index + 1) % roles.length);
          setPhase("typing");
        }
        return;
      }

      setPhase("deleting");
    }, delay);

    return () => clearTimeout(timer);
  }, [text, phase, roleIndex]);

  return (
    <span className="inline-block max-w-full align-baseline gradient-text">
      <span className="break-words">{text}</span>
      <span aria-hidden="true" className="inline-block h-[1em] w-[3px] bg-primary ml-1 align-middle animate-blink" />
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

      <div className="container grid lg:min-h-[calc(100vh-5rem)] lg:grid-cols-2 gap-12 items-center relative z-10 py-12 lg:pb-0 xl:pl-24">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="space-y-5 -translate-y-16 lg:-translate-y-32 xl:-translate-y-36">
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

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative flex justify-center lg:h-full lg:self-end lg:justify-end lg:items-end">
          <div className="relative w-full max-w-[470px] min-h-[540px] sm:min-h-[610px] lg:min-h-[calc(100vh-5rem)]">
            <div className="absolute inset-y-0 left-0 right-2 opacity-40 [background-image:linear-gradient(58deg,hsl(var(--foreground)/0.12)_1px,transparent_1px),linear-gradient(148deg,hsl(var(--foreground)/0.08)_1px,transparent_1px)] [background-size:38px_38px] [mask-image:radial-gradient(ellipse_at_center,black_16%,transparent_78%)]" />
            <div className="absolute left-8 top-[24%] h-44 w-48 opacity-35 [background-image:radial-gradient(circle,hsl(var(--foreground)/0.7)_1.4px,transparent_1.6px)] [background-size:18px_18px]" />
            <div className="absolute bottom-20 right-4 h-48 w-52 opacity-25 [background-image:radial-gradient(circle,hsl(var(--foreground)/0.7)_1.4px,transparent_1.6px)] [background-size:18px_18px]" />
            <div
              id="hero-photo-anchor"
              aria-hidden="true"
              className="invisible relative mx-auto h-[520px] w-[310px] sm:h-[590px] sm:w-[370px] lg:absolute lg:bottom-0 lg:right-0 lg:h-[calc(100vh-6rem)] lg:max-h-[760px] lg:w-[470px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
