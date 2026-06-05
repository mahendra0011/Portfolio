import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Button } from "@/components/ui/button";

type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  category: "Full Stack" | "Frontend" | "Backend";
  featured?: boolean;
  emoji: string;
};

const projects: Project[] = [
  {
    title: "MediCore — Hospital Management System",
    description:
      "Scalable full-stack Hospital Management System with multi-role workflows (Admin, Doctor, Patient), OTP verification, optimized RESTful APIs, middleware layers and modular architecture.",
    tech: ["React", "Node.js", "Express", "MongoDB", "ShadCN", "Multer", "Cloudinary"],
    github: "https://github.com/mahendra0011/mediCore.git",
    demo: "https://github.com/mahendra0011/mediCore.git",
    category: "Full Stack",
    featured: true,
    emoji: "🏥",
  },
  {
    title: "EventO — Event Booking Platform",
    description:
      "Full-stack event booking platform with secure authentication, OTP verification, and role-based access control for Admin, Host, and User.",
    tech: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB", "ReactBits"],
    github: "https://github.com/mahendra0011/EventO",
    demo: "https://enento.onrender.com",
    category: "Full Stack",
    emoji: "🎟️",
  },
  {
    title: "MindSupport — Mental Wellness Platform",
    description:
      "Full-stack mental wellness & counselling platform with user, counsellor and admin dashboards. Includes session booking, chat, payments and wellness tracking.",
    tech: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB", "ShadCN"],
    github: "https://github.com/mahendra0011",
    demo: "https://github.com/mahendra0011",
    category: "Full Stack",
    emoji: "🧠",
  },
  {
    title: "LostAndFound",
    description:
      "Full-stack MERN application to streamline reporting and recovery of lost items with secure user authentication and clean Material UI.",
    tech: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB", "Material UI"],
    github: "https://github.com/mahendra0011/Lost-and-Found-Website.git",
    demo: "https://lost-and-found-xlvq.onrender.com/",
    category: "Full Stack",
    emoji: "🔍",
  },
];

const filters = ["All", "Full Stack", "Frontend", "Backend"] as const;

const Projects = () => {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container">
        <SectionHeading eyebrow="Projects" title="Featured Work" description="A selection of things I've built recently" />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className={filter === f ? "gradient-bg shadow-glow" : ""}
            >
              {f}
            </Button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className={`relative glass rounded-2xl p-6 group hover:shadow-glow transition-all overflow-hidden ${
                  p.featured ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                {p.featured && (
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full gradient-bg text-xs font-semibold text-primary-foreground">
                    <Star className="w-3 h-3 fill-current" /> Featured
                  </div>
                )}
                <div className="absolute -inset-px gradient-bg opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl pointer-events-none" />
                <div className="text-5xl mb-4">{p.emoji}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-colors">{p.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href={p.github} target="_blank" rel="noreferrer"><Github className="w-4 h-4 mr-1.5" /> Code</a>
                  </Button>
                  <Button size="sm" asChild className="gradient-bg">
                    <a href={p.demo} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4 mr-1.5" /> Live</a>
                  </Button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;