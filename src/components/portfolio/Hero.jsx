import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Download, Mail, FolderGit2, Github, Linkedin } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.jpg";
const roles = [
    "Software Developer",
    "Full Stack Developer",
    "React Enthusiast",
    "Electronics & Communication Student",
];
const Typewriter = () => {
    const [text, setText] = useState("");
    const [i, setI] = useState(0);
    const [del, setDel] = useState(false);
    useEffect(() => {
        const current = roles[i % roles.length];
        const t = setTimeout(() => {
            if (!del) {
                setText(current.slice(0, text.length + 1));
                if (text === current)
                    setTimeout(() => setDel(true), 1500);
            }
            else {
                setText(current.slice(0, text.length - 1));
                if (text === "") {
                    setDel(false);
                    setI(i + 1);
                }
            }
        }, del ? 50 : 90);
        return () => clearTimeout(t);
    }, [text, del, i]);
    return (<span className="gradient-text">
      {text}
      <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle animate-blink"/>
    </span>);
};
const Hero = () => {
    return (<section id="home" className="relative min-h-screen flex items-center hero-bg overflow-hidden pt-20">
      {/* Animated blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-primary/30 blur-3xl animate-blob"/>
      <div className="absolute bottom-10 -right-10 w-96 h-96 rounded-full bg-accent/30 blur-3xl animate-blob" style={{ animationDelay: "3s" }}/>

      <div className="container grid lg:grid-cols-2 gap-12 items-center relative z-10 py-12">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
            Available for opportunities
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
            Hi, I'm <span className="gradient-text">Mahendra</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-semibold">
              I'm a <Typewriter />
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            B.Tech Electronics & Communication student from Jabalpur (M.P.) passionate about building
            real-world full-stack applications. I craft scalable MERN experiences using React, Node.js,
            Express and MongoDB.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild className="gradient-bg shadow-glow hover:scale-105 transition-transform">
              <a href="#projects"><FolderGit2 className="mr-2 h-4 w-4"/> View Projects</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="hover:scale-105 transition-transform">
              <a href="#contact"><Mail className="mr-2 h-4 w-4"/> Contact Me</a>
            </Button>
            <Button size="lg" variant="secondary" asChild className="hover:scale-105 transition-transform">
              <a href="/Mahendra_Resume.pdf" download><Download className="mr-2 h-4 w-4"/> Resume</a>
            </Button>
          </div>

          <div className="flex items-center gap-4 pt-4">
            {[
            { Icon: Github, href: "https://github.com/mahendra0011" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/mahendra-prajapati-73163930b" },
            { Icon: SiLeetcode, href: "https://leetcode.com/u/mahendra_0011/" },
            { Icon: Mail, href: "mailto:mahendrapra0077@gmail.com" },
        ].map(({ Icon, href }, idx) => (<motion.a key={idx} href={href} target="_blank" rel="noreferrer" whileHover={{ y: -4, scale: 1.1 }} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-primary transition-colors">
                <Icon className="w-5 h-5"/>
              </motion.a>))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-4 gradient-bg rounded-full blur-3xl opacity-40 animate-pulse"/>
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden glass shadow-glow animate-float">
              <div className="absolute inset-0 gradient-bg opacity-10"/>
              <img src={profileImg} alt="Mahendra Prajapati portrait" className="relative w-full h-full object-cover object-top"/>
            </div>
            {/* Floating badges */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-10 -left-6 glass rounded-2xl px-4 py-2 shadow-elegant">
              <span className="text-2xl">⚛️</span>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-20 -right-4 glass rounded-2xl px-4 py-2 shadow-elegant">
              <span className="text-2xl">🚀</span>
            </motion.div>
            <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-1/2 right-0 lg:-right-4 glass rounded-2xl px-3 py-2 shadow-elegant text-xs font-semibold">
              MERN
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>);
};
export default Hero;
