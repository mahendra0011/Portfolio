import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
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
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { selectProjectFilter, setProjectFilter } from "@/store/portfolioStore";
import SectionHeading from "./SectionHeading";

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
    <section id="projects" className="py-20 sm:py-24">
      <div className="container">
        <SectionHeading eyebrow="Projects" title="Featured Work" description="Selected full-stack and frontend projects with live demos." />

        <div className="mb-9 flex flex-wrap justify-center gap-2">
          {filters.map((item) => (
            <Button
              key={item}
              variant={filter === item ? "default" : "outline"}
              size="sm"
              aria-pressed={filter === item}
              onClick={() => dispatch(setProjectFilter(item))}
              className={filter === item ? "gradient-bg shadow-glow" : "bg-card/80"}
            >
              {item}
            </Button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <SpotlightCard
                key={project.title}
                as={motion.article}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                whileHover={{ y: -5 }}
                className={`group relative flex min-h-[360px] flex-col overflow-hidden rounded-lg border border-border/65 bg-card/90 p-4 shadow-sm transition-all hover:shadow-elegant ${
                  project.featured && filter === "All" ? "lg:col-span-2" : ""
                }`}
              >
                {project.image ? (
                  <div className="mb-5 aspect-video overflow-hidden rounded-lg border border-border/60 bg-secondary/45">
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="mb-5 flex aspect-video items-center justify-center rounded-lg border border-border/60 bg-secondary/45">
                    <project.Icon className="h-12 w-12 text-primary" />
                  </div>
                )}

                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <project.Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <span className="rounded-lg bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="mb-3 text-xl font-bold leading-tight">{project.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-lg border border-border/60 bg-background/65 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  {project.github && (
                    <Button size="sm" variant="outline" asChild className="bg-card/80">
                      <a href={project.github} target="_blank" rel="noreferrer">
                        <Github className="mr-1.5 h-4 w-4" />
                        Code
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
                        <ExternalLink className="mr-1.5 h-4 w-4" />
                        {isExternal(project.demo) ? "Live" : "Preview"}
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
