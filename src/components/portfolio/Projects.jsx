import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  ExternalLink,
  Github,
  HeartPulse,
  Hospital,
  MonitorSmartphone,
  Search,
  Star,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { selectProjectFilter, setProjectFilter } from "@/store/portfolioStore";

const projects = [
  {
    title: "MediCore - Hospital Management System",
    description:
      "Scalable full-stack hospital management system with multi-role workflows, OTP verification, optimized REST APIs, middleware layers and modular architecture.",
    tech: ["React", "Node.js", "Express", "MongoDB", "shadcn/ui", "Multer", "Cloudinary"],
    github: "https://github.com/mahendra0011/mediCore.git",
    demo: "https://medicore-main-1.onrender.com",
    category: "Full Stack",
    featured: true,
    Icon: Hospital,
    image: "/projects/medicore.png",
    imageAlt: "MediCore healthcare landing page screenshot",
  },
  {
    title: "EventO - Event Booking Platform",
    description:
      "Full-stack event booking platform with secure authentication, OTP verification, role-based access control and a polished event discovery flow.",
    tech: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "ReactBits"],
    github: "https://github.com/mahendra0011/EventO",
    demo: "https://enento.onrender.com",
    category: "Full Stack",
    Icon: CalendarCheck,
    image: "/projects/evento.png",
    imageAlt: "EventO event booking platform landing page screenshot",
  },
  {
    title: "MindSupport - Mental Wellness Platform",
    description:
      "Mental wellness and counselling platform with user, counsellor and admin dashboards for session booking, chat, payments and wellness tracking.",
    tech: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "shadcn/ui"],
    github: "https://github.com/mahendra0011",
    category: "Full Stack",
    Icon: HeartPulse,
  },
  {
    title: "LostAndFound",
    description:
      "MERN application that streamlines reporting and recovery of lost items with secure authentication and a clean Material UI experience.",
    tech: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Material UI"],
    github: "https://github.com/mahendra0011/Lost-and-Found-Website.git",
    demo: "https://lost-and-found-xlvq.onrender.com/",
    category: "Full Stack",
    Icon: Search,
    image: "/projects/lost-and-found.png",
    imageAlt: "LostAndFound platform landing page screenshot",
  },
  {
    title: "Portfolio Showcase",
    description:
      "Responsive developer portfolio built with HTML, CSS, JavaScript, React, Redux, Tailwind CSS, shadcn/ui and ReactBits-style interactions.",
    tech: ["HTML", "CSS", "JavaScript", "React", "Redux", "Tailwind CSS", "shadcn/ui", "ReactBits"],
    demo: "#home",
    category: "Frontend",
    Icon: MonitorSmartphone,
  },
];

const filters = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];
const isExternal = (href) => /^https?:\/\//.test(href);

const Projects = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectProjectFilter);
  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  return (
    <section id="projects" className="py-24 relative">
      <div className="container">
        <SectionHeading eyebrow="Projects" title="Featured Work" description="A selection of things I've built recently" />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((item) => (
            <Button
              key={item}
              variant={filter === item ? "default" : "outline"}
              size="sm"
              aria-pressed={filter === item}
              onClick={() => dispatch(setProjectFilter(item))}
              className={filter === item ? "gradient-bg shadow-glow" : ""}
            >
              {item}
            </Button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <SpotlightCard
                key={project.title}
                as={motion.article}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                whileHover={{ y: -6 }}
                className="relative glass rounded-xl p-6 group hover:shadow-glow transition-all overflow-hidden flex flex-col min-h-[360px]"
              >
                <div className="absolute -inset-px gradient-bg opacity-0 group-hover:opacity-10 transition-opacity rounded-xl pointer-events-none" />
                {project.image && (
                  <div className="relative mb-5 aspect-video overflow-hidden rounded-lg border border-border/60 bg-muted/30">
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
                  </div>
                )}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center shadow-glow">
                    <project.Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full gradient-bg px-3 py-1 text-xs font-semibold text-primary-foreground">
                        <Star className="w-3 h-3 fill-current" /> Featured
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-colors">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-secondary/80 text-secondary-foreground font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  {project.github && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.github} target="_blank" rel="noreferrer">
                        <Github className="w-4 h-4 mr-1.5" /> Code
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button size="sm" asChild className="gradient-bg">
                      <a
                        href={project.demo}
                        target={isExternal(project.demo) ? "_blank" : undefined}
                        rel={isExternal(project.demo) ? "noreferrer" : undefined}
                      >
                        <ExternalLink className="w-4 h-4 mr-1.5" /> {isExternal(project.demo) ? "Live" : "Preview"}
                      </a>
                    </Button>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
