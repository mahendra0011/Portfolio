import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Code2, Download, FolderGit2, Github, Linkedin, Mail, MapPin, Rocket, Sparkles } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.jpg";

const roles = [
  "Software Developer",
  "Full Stack Developer",
  "React Developer",
  "MERN Stack Builder",
];

const Typewriter = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index % roles.length];
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text === current) setTimeout(() => setDeleting(true), 1300);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text === "") {
          setDeleting(false);
          setIndex(index + 1);
        }
      }
    }, deleting ? 45 : 85);

    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <span className="gradient-text">
      {text}
      <span className="ml-1 inline-block h-[1em] w-[3px] animate-blink bg-primary align-middle" />
    </span>
  );
};

const statItems = [
  { Icon: Code2, value: "5+", label: "MERN Projects" },
  { Icon: Rocket, value: "400+", label: "GitHub Commits" },
  { Icon: Sparkles, value: "16+", label: "Tech Stack" },
];

const socialLinks = [
  { Icon: Github, href: "https://github.com/mahendra0011", label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/mahendra-prajapati-73163930b", label: "LinkedIn" },
  { Icon: SiLeetcode, href: "https://leetcode.com/u/mahendra_0011/", label: "LeetCode" },
  { Icon: Mail, href: "mailto:mahendrapra0077@gmail.com", label: "Email" },
];

const Hero = () => (
  <section id="home" className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden pt-24 pb-12 md:pt-28 md:pb-16">
    <div className="absolute inset-0 hero-bg pointer-events-none" />
    <div className="absolute inset-x-0 top-16 h-px bg-border/70" />

    <div className="container relative z-10 grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:gap-14">
      <div className="max-w-3xl space-y-7">
        <div className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-card/80 px-4 py-2 text-xs font-semibold text-primary shadow-sm">
          <span className="h-2 w-2 rounded-full bg-primary" />
          Available for internships and full-stack work
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold leading-[1.05] tracking-normal text-foreground sm:text-5xl lg:text-7xl">
            Hi, I'm <span className="gradient-text">Mahendra Prajapati</span>
            <span className="mt-3 block text-2xl font-semibold text-foreground/75 sm:text-3xl lg:text-5xl">
              I'm a <Typewriter />
            </span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            B.Tech Electronics & Communication student from Jabalpur, building production-style MERN projects with
            React, Redux, Tailwind CSS, shadcn/ui and clean backend APIs.
          </p>
        </div>

        <div className="grid gap-3 sm:flex sm:flex-wrap">
          <Button size="lg" asChild className="w-full gradient-bg shadow-glow transition-transform hover:scale-[1.02] sm:w-auto">
            <a href="#projects">
              <FolderGit2 className="mr-2 h-4 w-4" />
              View Projects
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full bg-card/80 transition-transform hover:scale-[1.02] sm:w-auto">
            <a href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </a>
          </Button>
          <Button size="lg" variant="secondary" asChild className="w-full transition-transform hover:scale-[1.02] sm:w-auto">
            <a href="/Mahendra_Resume.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {["HTML", "CSS", "JavaScript", "Tailwind", "React", "Redux"].map((tech) => (
            <span key={tech} className="rounded-lg border border-border/70 bg-card/75 px-3 py-1.5 text-sm font-medium text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>

        <div className="grid max-w-xl gap-3 sm:grid-cols-3">
          {statItems.map(({ Icon, value, label }) => (
            <div key={label} className="glass rounded-lg px-4 py-3">
              <Icon className="mb-2 h-4 w-4 text-primary" />
              <div className="text-xl font-bold">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              whileHover={{ y: -3, scale: 1.05 }}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-card/80 text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon className="h-5 w-5" />
            </motion.a>
          ))}
        </div>
      </div>

      <div className="flex justify-center md:justify-end">
        <div className="w-full max-w-[330px]">
          <div className="glass rounded-lg p-3 shadow-elegant">
            <div className="relative aspect-[9/16] overflow-hidden rounded-lg bg-secondary/55">
              <img src={profileImg} alt="Mahendra Prajapati portrait" className="h-full w-full object-contain object-center" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border/70 bg-card/85 p-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Focus</p>
              <p className="font-semibold">MERN Stack</p>
            </div>
            <div className="rounded-lg border border-border/70 bg-card/85 p-3">
              <p className="flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground">
                <MapPin className="h-3 w-3" />
                Based in
              </p>
              <p className="font-semibold">Jabalpur</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
