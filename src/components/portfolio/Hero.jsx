import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Download, Mail, FolderGit2 } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/reactbits/MagneticButton";
import { handleHashLinkClick } from "@/lib/scrollToHash";

const roles = [
  "React developer",
  "Software Developer",
  "Full Stack Developer",
  "Electronics & Communication Student",
];

const socialLinks = [
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/mahendra0011" },
  { Icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mahendra-prajapati-73163930b" },
  { Icon: Mail, label: "Mail", href: "mailto:mahendrapra0077@gmail.com" },
  { Icon: FaTelegram, label: "Telegram", href: "https://t.me/Mahi00776" },
  { Icon: FaXTwitter, label: "X", href: "https://x.com/mahendra0011" },
  { Icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@Mahendraprajapati-bt1bd" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/_mahendra._07?utm_source=qr&igsh=c2dpamNndnR6bDQ4" },
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
  const heroRef = useRef(null);

  useEffect(() => {
    const element = heroRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let fallbackId = 0;
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .fromTo(".hero-kicker", { y: 16 }, { y: 0, duration: 0.55 })
        .fromTo(".hero-title-line", { y: 34, rotateX: 9 }, { y: 0, rotateX: 0, duration: 0.72, stagger: 0.08 }, "-=0.2")
        .fromTo(".hero-copy", { y: 20 }, { y: 0, duration: 0.58 }, "-=0.28")
        .fromTo(".hero-action", { y: 20, scale: 0.96 }, { y: 0, scale: 1, duration: 0.48, stagger: 0.08 }, "-=0.26")
        .fromTo(".hero-social", { x: -16 }, { x: 0, duration: 0.38, stagger: 0.055 }, "-=0.5");

      fallbackId = window.setTimeout(() => {
        gsap.set(".hero-kicker, .hero-title-line, .hero-copy, .hero-action, .hero-social", {
          clearProps: "transform,opacity,visibility",
        });
      }, 1600);
    }, element);

    return () => {
      window.clearTimeout(fallbackId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative flex min-h-[100svh] items-center overflow-hidden hero-bg pt-20 sm:pt-24 lg:min-h-screen">
      <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
        {socialLinks.map(({ Icon, label, href }) => (
          <MagneticButton key={label} strength={0.12}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              title={label}
              className="hero-social w-11 h-11 rounded-full glass flex items-center justify-center hover:text-primary transition-all shadow-elegant"
            >
              <Icon className="w-5 h-5" />
            </a>
          </MagneticButton>
        ))}
      </div>

      <div data-scroll-parallax="-90" data-scroll-trigger="#home" className="absolute top-20 -left-20 h-72 w-72 will-change-transform">
        <div className="h-full w-full rounded-full bg-primary/30 blur-3xl animate-blob" />
      </div>
      <div data-scroll-parallax="70" data-scroll-trigger="#home" className="absolute bottom-10 -right-10 h-96 w-96 will-change-transform">
        <div className="h-full w-full rounded-full bg-accent/30 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container relative z-10 grid min-h-[calc(100svh-5rem)] items-center gap-8 py-8 sm:gap-10 sm:py-10 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-2 lg:gap-12 lg:pb-0 xl:pl-24">
        <div className="mx-auto max-w-2xl space-y-4 text-center lg:mx-0 lg:max-w-none lg:self-start lg:pt-[5.5rem] lg:text-left xl:pt-[6.5rem]">
          <div className="hero-kicker inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
            <span className="hero-title-line block">Hi, I'm <span className="block sm:inline gradient-text">Mahendra</span></span>
            <span className="hero-title-line block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-semibold">
              I'm a <Typewriter />
            </span>
          </h1>

          <p className="hero-copy mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            I can build scalable, secure, and high-performance web applications. Turning ideas into
            impactful, production-ready digital products with modern technologies.
          </p>

          <div className="flex flex-row flex-wrap justify-center gap-3 lg:justify-start">
            <MagneticButton className="hero-action min-w-0 flex-1 basis-[8.75rem] sm:w-auto sm:flex-none sm:basis-auto">
              <Button size="lg" asChild className="group w-full px-4 gradient-bg shadow-glow transition-transform sm:w-auto sm:px-8">
                <a href="#projects" onClick={(event) => handleHashLinkClick(event, "#projects")}>
                  <FolderGit2 className="mr-2 h-4 w-4 transition-transform group-hover:-rotate-6" /> View Projects
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton className="hero-action min-w-0 flex-1 basis-[8.75rem] sm:w-auto sm:flex-none sm:basis-auto">
              <Button size="lg" variant="outline" asChild className="group w-full overflow-hidden px-4 transition-transform sm:w-auto sm:px-8">
                <a href="#contact" onClick={(event) => handleHashLinkClick(event, "#contact")}>
                  <Mail className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" /> Contact Me
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton className="hero-action min-w-0 flex-1 basis-[8.75rem] sm:w-auto sm:flex-none sm:basis-auto">
              <Button size="lg" variant="secondary" asChild className="group w-full px-4 transition-transform sm:w-auto sm:px-8">
                <a href="/Mahendra_Resume.pdf" download>
                  <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" /> Resume
                </a>
              </Button>
            </MagneticButton>
          </div>

          <div className="hidden flex-wrap items-center justify-center gap-3 pt-2 sm:flex lg:justify-start lg:hidden">
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
        </div>

        <div className="relative flex justify-center lg:h-full lg:self-end lg:items-end lg:justify-end">
          <div className="hero-photo-stage relative w-full max-w-[470px]">
            <div className="absolute inset-y-0 left-0 right-2 opacity-60 [background-image:linear-gradient(58deg,hsl(var(--foreground)/0.18)_1px,transparent_1px),linear-gradient(148deg,hsl(var(--foreground)/0.13)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
            <div className="absolute left-8 top-[24%] h-44 w-48 opacity-45 [background-image:radial-gradient(circle,hsl(var(--foreground)/0.76)_1.4px,transparent_1.6px)] [background-size:18px_18px]" />
            <div className="absolute bottom-20 right-4 h-48 w-52 opacity-35 [background-image:radial-gradient(circle,hsl(var(--foreground)/0.76)_1.4px,transparent_1.6px)] [background-size:18px_18px]" />
            <div
              id="hero-photo-anchor"
              aria-hidden="true"
              className="floating-photo-anchor floating-photo-anchor--hero invisible relative mx-auto lg:absolute lg:bottom-0 lg:right-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
