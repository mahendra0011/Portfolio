import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Github,
  Star,
  Sparkles,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/reactbits/MagneticButton";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

const projects = [
  {
    title: "MediCore - Hospital Management System",
    description:
      "Full-stack hospital management system with patient, doctor and admin portals, OTP auth, appointments, records, lab services, billing, emergency cases, reports, notifications and PDF documents.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Multer", "Cloudinary", "PDFKit"],
    github: "https://github.com/mahendra0011/mediCore.git",
    demo: "https://medicore-main-1.onrender.com",
    featured: true,
    image: "/projects/medicore.png",
    icon: "/projects/icons/medicore.png",
    imageAlt: "MediCore healthcare landing page screenshot",
  },
  {
    title: "EventO - Event Booking Platform",
    description:
      "Event booking platform for public discovery, ticket booking with OTP verification, host dashboards, attendee messaging, support tickets, admin controls, reports and Render-ready deployment.",
    tech: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "OTP", "Reports"],
    github: "https://github.com/mahendra0011/EventO",
    demo: "https://enento.onrender.com",
    image: "/projects/evento.png",
    icon: "/projects/icons/evento.png",
    imageAlt: "EventO event booking platform landing page screenshot",
  },
  {
    title: "MindSupport - Mental Wellness Platform",
    description:
      "JavaScript-only, MongoDB-only counselling platform with counsellor discovery, role dashboards, verification, scheduling, Google Meet support, secure chat, wellness tracking, payments, reviews and admin moderation.",
    tech: ["JavaScript", "React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Payments"],
    image: "/projects/mindsupport.png",
    icon: "/projects/icons/mindsupport.png",
    imageAlt: "MindSupport mental wellness platform landing page screenshot",
  },
  {
    title: "MoviX - Movie Ticket Booking Platform",
    description:
      "Full-stack movie ticket booking platform for browsing movies, coming-soon releases, seat selection, ticket booking, theater management and admin or owner workflows.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Cloudinary", "JWT"],
    image: "/projects/movix.png",
    icon: "/projects/icons/movix.png",
    imageAlt: "MoviX movie ticket booking platform landing page screenshot",
  },
  {
    title: "RentPE - Room Rental Marketplace",
    description:
      "Room rental marketplace for students, interns, job seekers and movers. Seekers compare PGs, hostels, flats and rooms while owners publish listings using city, area, landmark, title, amenities, rules and descriptions.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Search", "Marketplace"],
    image: "/projects/rentpe.png",
    icon: "/projects/icons/rentpe.png",
    imageAlt: "RentPE room rental marketplace landing page screenshot",
  },
  {
    title: "TempTalk - Anonymous Chat Platform",
    description:
      "Privacy-focused anonymous chat platform with encrypted messaging, real-time Socket.IO rooms, media sharing, temporary chat rooms, PWA and Android support, deep links and QR invites.",
    tech: ["React", "Express.js", "Socket.IO", "MongoDB", "PWA", "Android"],
    demo: "https://temptalk-1.onrender.com",
    image: "/projects/temptalk.png",
    icon: "/projects/icons/temptalk.png",
    imageAlt: "TempTalk anonymous chat platform landing page screenshot",
  },
  {
    title: "StudyBuddy - AI Study Platform",
    description:
      "AI-powered study platform using Gemini AI to generate structured notes, summarize PDFs and YouTube lectures, manage study tasks and organize personalized content libraries with secure authentication.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Gemini AI", "PDF", "YouTube"],
    image: "/projects/studybuddy.png",
    icon: "/projects/icons/studybuddy.png",
    imageAlt: "StudyBuddy AI study platform landing page screenshot",
  },
  {
    title: "LostAndFound - Recovery Platform",
    description:
      "Full-stack MERN application for reporting, searching and recovering lost items with JWT authentication, image uploads, advanced search and filtering, item status management and responsive recovery workflows.",
    tech: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Image Uploads"],
    github: "https://github.com/mahendra0011/Lost-and-Found-Website.git",
    demo: "https://lost-and-found-xlvq.onrender.com/",
    image: "/projects/lost-and-found.png",
    icon: "/projects/icons/lost-and-found.png",
    imageAlt: "LostAndFound platform landing page screenshot",
  },
];

const isExternal = (href) => /^https?:\/\//.test(href);
const INITIAL_PROJECT_COUNT = 4;

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_PROJECT_COUNT);
  const hasMoreProjects = projects.length > visibleProjects.length;

  useEffect(() => {
    if (!sectionRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { autoAlpha: 0, y: 70, rotateX: 8, transformPerspective: 900 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".project-grid", start: "top 78%" },
        },
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [showAll, visibleProjects.length]);

  return (
    <section id="projects" ref={sectionRef} className="section-grid py-24 relative overflow-hidden">
        <div className="container relative">
        <SectionHeading eyebrow="Projects" title="Things I've Built" description="A selection of things I've built recently" />

        <motion.div layout className="project-grid grid md:grid-cols-2 gap-6 max-w-6xl mx-auto [perspective:1200px]">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <SpotlightCard
                key={project.title}
                as={motion.article}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                whileHover={{ y: -10, rotateX: 1.5 }}
                className="project-card relative glass rounded-xl p-5 group hover:shadow-glow transition-all overflow-hidden flex flex-col min-h-[390px] will-change-transform"
              >
                <div className="absolute -inset-px gradient-bg opacity-0 group-hover:opacity-10 transition-opacity rounded-xl pointer-events-none" />
                {project.image && (
                  <div className="relative mb-5 aspect-[1.9/1] overflow-hidden rounded-lg border border-border/60 bg-background/80 shadow-inner">
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      className="project-image absolute inset-0 h-full w-full select-none object-contain object-center p-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-border/70 bg-background shadow-glow">
                    <img
                      src={project.icon}
                      alt={`${project.title} icon`}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      className="h-full w-full select-none object-cover"
                    />
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
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
                    <MagneticButton strength={0.16}>
                      <Button size="sm" variant="outline" asChild className="group">
                        <a href={project.github} target="_blank" rel="noreferrer">
                          <Github className="w-4 h-4 mr-1.5 transition-transform group-hover:-rotate-6" /> Code
                        </a>
                      </Button>
                    </MagneticButton>
                  )}
                  {project.demo && (
                    <MagneticButton strength={0.16}>
                      <Button size="sm" asChild className="group gradient-bg">
                        <a
                          href={project.demo}
                          target={isExternal(project.demo) ? "_blank" : undefined}
                          rel={isExternal(project.demo) ? "noreferrer" : undefined}
                        >
                          <ExternalLink className="w-4 h-4 mr-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> {isExternal(project.demo) ? "Live" : "Preview"}
                        </a>
                      </Button>
                    </MagneticButton>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMoreProjects && (
          <div className="mt-10 flex justify-center">
            <MagneticButton>
              <Button size="lg" onClick={() => setShowAll(true)} className="group gradient-bg shadow-glow">
                See More <Sparkles className="ml-1 h-4 w-4 transition-transform group-hover:rotate-12" />
              </Button>
            </MagneticButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
