import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  BookOpen,
  ExternalLink,
  Film,
  Github,
  HeartPulse,
  Home,
  Hospital,
  MessageCircle,
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
      "Full-stack hospital management system with patient, doctor and admin portals, OTP auth, appointments, records, lab services, billing, emergency cases, reports, notifications and PDF documents.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Multer", "Cloudinary", "PDFKit"],
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
      "Event booking platform for public discovery, ticket booking with OTP verification, host dashboards, attendee messaging, support tickets, admin controls, reports and Render-ready deployment.",
    tech: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "OTP", "Reports"],
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
      "JavaScript-only, MongoDB-only counselling platform with counsellor discovery, role dashboards, verification, scheduling, Google Meet support, secure chat, wellness tracking, payments, reviews and admin moderation.",
    tech: ["JavaScript", "React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Payments"],
    category: "Full Stack",
    Icon: HeartPulse,
    image: "/projects/mindsupport.png",
    imageAlt: "MindSupport mental wellness platform landing page screenshot",
  },
  {
    title: "MoviX - Movie Ticket Booking Platform",
    description:
      "Full-stack movie ticket booking platform for browsing movies, coming-soon releases, seat selection, ticket booking, theater management and admin or owner workflows.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Cloudinary", "JWT"],
    category: "Full Stack",
    Icon: Film,
    image: "/projects/movix.png",
    imageAlt: "MoviX movie ticket booking platform landing page screenshot",
  },
  {
    title: "RentPE - Room Rental Marketplace",
    description:
      "Room rental marketplace for students, interns, job seekers and movers. Seekers compare PGs, hostels, flats and rooms while owners publish listings using city, area, landmark, title, amenities, rules and descriptions.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Search", "Marketplace"],
    category: "Full Stack",
    Icon: Home,
    image: "/projects/rentpe.png",
    imageAlt: "RentPE room rental marketplace landing page screenshot",
  },
  {
    title: "TempTalk - Anonymous Chat Platform",
    description:
      "Privacy-focused anonymous chat platform with encrypted messaging, real-time Socket.IO rooms, media sharing, temporary chat rooms, PWA and Android support, deep links and QR invites.",
    tech: ["React", "Express.js", "Socket.IO", "MongoDB", "PWA", "Android"],
    demo: "https://temptalk-1.onrender.com",
    category: "Full Stack",
    Icon: MessageCircle,
    image: "/projects/temptalk.png",
    imageAlt: "TempTalk anonymous chat platform landing page screenshot",
  },
  {
    title: "StudyBuddy - AI Study Platform",
    description:
      "AI-powered study platform using Gemini AI to generate structured notes, summarize PDFs and YouTube lectures, manage study tasks and organize personalized content libraries with secure authentication.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Gemini AI", "PDF", "YouTube"],
    category: "Full Stack",
    Icon: BookOpen,
    image: "/projects/studybuddy.png",
    imageAlt: "StudyBuddy AI study platform landing page screenshot",
  },
  {
    title: "LostAndFound - Recovery Platform",
    description:
      "Full-stack MERN application for reporting, searching and recovering lost items with JWT authentication, image uploads, advanced search and filtering, item status management and responsive recovery workflows.",
    tech: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Image Uploads"],
    github: "https://github.com/mahendra0011/Lost-and-Found-Website.git",
    demo: "https://lost-and-found-xlvq.onrender.com/",
    category: "Full Stack",
    Icon: Search,
    image: "/projects/lost-and-found.png",
    imageAlt: "LostAndFound platform landing page screenshot",
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
