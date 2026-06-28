import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Star, Sparkles, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export const projects = [
  {
    id: "medicore-hospital-system",
    title: "MediCore - Hospital System",
    description: "Full-stack hospital management system with patient, doctor and admin portals, OTP auth, appointments, records, lab services, billing, emergency cases, reports, notifications and PDF documents.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Multer", "Cloudinary", "PDFKit"],
    github: "https://github.com/mahendra0011/mediCore.git",
    demo: "https://medicore-main-1.onrender.com",
    featured: true,
    image: "/projects/medicore.png",
    color: "#2D2D35",
  },
  {
    id: "evento-event-platform",
    title: "EventO - Event Platform",
    description: "Event booking platform for public discovery, ticket booking with OTP verification, host dashboards, attendee messaging, support tickets, admin controls, reports and Render-ready deployment.",
    tech: ["React", "Tailwind", "Express.js", "MongoDB", "OTP", "Reports"],
    github: "https://github.com/mahendra0011/EventO",
    demo: "http://evento-1645479696.us-east-2.elb.amazonaws.com/",
    image: "/projects/evento.png",
    color: "#393941",
  },
  {
    id: "mindsupport-mental-wellness",
    title: "MindSupport - Mental Wellness",
    description: "Smart India Hackathon 2025 mental wellness solution with counsellor discovery, role dashboards, verification, scheduling, Google Meet support, secure chat, wellness tracking, payments, reviews and admin moderation.",
    tech: ["JavaScript", "React", "Node.js", "Socket.IO", "Payments"],
    github: "https://github.com/mahendra0011/mindSupport",
    demo: "https://mindsupport-1.onrender.com/",
    event: "SIH 2025",
    image: "/projects/mindsupport.png",
    color: "#6B7280",
  },
  {
    id: "movix-movie-tickets",
    title: "MoviX - Movie Tickets",
    description: "Full-stack movie ticket booking platform for browsing movies, coming-soon releases, seat selection, ticket booking, theater management and admin or owner workflows.",
    tech: ["React", "Node.js", "MongoDB", "Cloudinary", "JWT"],
    github: "https://github.com/mahendra0011/movix",
    demo: "https://movix-p8ez.onrender.com",
    image: "/projects/movix.png",
    color: "#2D2D35",
  },
  {
    id: "rentpe-room-rentals",
    title: "RentPE - Room Rentals",
    description: "Room rental marketplace for students, interns, job seekers and movers. Seekers compare PGs, hostels, flats and rooms while owners publish listings using city, area, landmark, title, amenities, rules and descriptions.",
    tech: ["React", "Express.js", "MongoDB", "Marketplace"],
    github: "https://github.com/mahendra0011/RentPE",
    demo: "https://rentpe-j7bq.onrender.com",
    image: "/projects/rentpe.png",
    color: "#2D2D35",
  },
  {
    id: "temptalk-anonymous-chat",
    title: "TempTalk - Anonymous Chat",
    description: "Privacy-focused anonymous chat platform with encrypted messaging, real-time Socket.IO rooms, media sharing, temporary chat rooms, PWA and Android support, deep links and QR invites.",
    tech: ["React", "Socket.IO", "MongoDB", "PWA", "Android"],
    github: "https://github.com/mahendra0011/TempTalk",
    demo: "https://temptalk-1.onrender.com",
    image: "/projects/temptalk.png",
    color: "#393941",
  },
  {
    id: "studybuddy-ai-platform",
    title: "StudyBuddy - AI Platform",
    description: "AI-powered study platform using Gemini AI to generate structured notes, summarize PDFs and YouTube lectures, manage study tasks and organize personalized content libraries with secure authentication.",
    tech: ["React", "Gemini AI", "Node.js", "MongoDB", "PDF", "YouTube"],
    github: "https://github.com/mahendra0011/StudyBuddy",
    demo: "https://studybuddy-86s2.onrender.com",
    image: "/projects/studybuddy.png",
    color: "#6B7280",
  },
  {
    id: "lostandfound-recovery",
    title: "LostAndFound - Recovery",
    description: "Full-stack MERN application for reporting, searching and recovering lost items with JWT authentication, image uploads, advanced search and filtering, item status management and responsive recovery workflows.",
    tech: ["React", "MongoDB", "JWT", "Image Uploads"],
    github: "https://github.com/mahendra0011/Lost-and-Found-Website.git",
    demo: "https://lost-and-found-xlvq.onrender.com/",
    image: "/projects/lost-and-found.png",
    color: "#2D2D35",
  },
  {
    id: "cloudnest-file-system",
    title: "CloudNest - File System",
    description: "Full-stack file upload system — Users register, login with Google, upload files, and every file is stored in the owner's Google Drive. Real-time status via Socket.io with Redux state management.",
    tech: ["React", "Redux", "MUI", "Shadcn", "Socket.io", "Express"],
    github: "#",
    demo: "#",
    image: "/projects/medicore.png",
    color: "#2D2D35",
  },
  {
    id: "integratekit",
    title: "⚡ IntegrateKit",
    description: "The definitive integration directory for MERN Stack developers — real code snippets, setup guides, and screenshots for integrating with 330+ services. Stop Googling, start building.",
    tech: ["React 18", "Vite", "Tailwind", "Framer Motion", "GSAP"],
    github: "#",
    demo: "#",
    featured: true,
    image: "/projects/evento.png",
    color: "#393941",
  },
  {
    id: "hireinterns",
    title: "HireInterns",
    description: "A streamlined platform bridging the gap between innovative companies and talented interns looking for their next big opportunity. (Coming Soon)",
    tech: ["MERN", "Coming Soon"],
    github: "#",
    demo: "#",
    image: "/projects/mindsupport.png",
    color: "#6B7280",
  },
  {
    id: "one-in-a-million",
    title: "One in A Million",
    description: "An exclusive platform showcasing unique ideas, talents, and portfolios from extraordinary individuals worldwide. (Coming Soon)",
    tech: ["React", "Coming Soon"],
    github: "#",
    demo: "#",
    image: "/projects/movix.png",
    color: "#2D2D35",
  },
  {
    id: "civicissue",
    title: "CivicIssue",
    description: "A community-driven platform to report, track, and resolve local civic issues directly with local authorities. Photo evidence, geo-tagging, status tracking and public voting on priority issues.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "#",
    demo: "#",
    image: "/projects/rentpe.png",
    color: "#2D2D35",
  },
  {
    id: "project-nexus",
    title: "Project Nexus",
    description: "A robust internal tool for managing workflow and tracking sprint velocities in agile development teams. Kanban boards, burndown charts, team capacity planning and retrospective tools.",
    tech: ["Next.js", "Tailwind", "PostgreSQL"],
    github: "#",
    demo: "#",
    image: "/projects/studybuddy.png",
    color: "#393941",
  },
  {
    id: "apex-fitness-club",
    title: "Apex Fitness Club",
    description: "A high-performance modern frontend for a premium fitness club featuring interactive class schedules and personal trainer portfolios. (Coming Soon)",
    tech: ["Frontend", "UI/UX", "Coming Soon"],
    github: "#",
    demo: "#",
    image: "/projects/temptalk.png",
    color: "#6B7280",
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const wrapperRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAndroid = /Android/i.test(navigator.userAgent);

    // Isolate configuration so it doesn't corrupt Hero/About section images
    if (isAndroid) {
      ScrollTrigger.config({ 
        ignoreMobileResize: true // Dynamic URL bar updates ko block karega bina baki page ko tode
      });
    }

    const ctx = gsap.context(() => {
      const wrappers = wrapperRefs.current.filter(Boolean);

      wrappers.forEach((wrapper, i) => {
        // Tumhara exact 100% original loop boundary condition Windows ke liye
        if (i === wrappers.length - 1) return;

        const card = wrapper.querySelector(".project-card");
        if (!card) return;

        // Only animate scaling on desktop (md screens and up)
        if (window.innerWidth >= 768) {
          gsap.to(card, {
            scale: 0.92,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: () => `top ${window.innerHeight * 0.12 + i * 12}px`, 
              end: () => `+=${window.innerHeight}`, 
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      });

      // Timeout refreshed locally inside context scope only
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-grid bg-slate-950">
      
      <div className="container mx-auto px-4 pt-20 sm:pt-24 pb-12">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've Built"
          description="A selection of things I've built recently"
        />
      </div>

      <div className="bento-grid relative pb-[10vh]">
        {projects.map((proj, index) => (
          <div
            key={proj.title}
            ref={(el) => {
              if (el) wrapperRefs.current[index] = el;
            }}
            className="flex items-start justify-center px-4 mb-8 md:mb-0"
            style={{
              position: window.innerWidth >= 768 ? "sticky" : "relative",
              top: window.innerWidth >= 768 ? `calc(12vh + ${index * 12}px)` : "auto",
              height: window.innerWidth >= 768 ? "100svh" : "auto",
            }}
          >
            <div
              className="project-card w-full max-w-[1200px] md:w-[90vw] rounded-[28px] p-5 md:p-8 lg:p-10 flex flex-col md:flex-row gap-5 md:gap-10 will-change-transform"
              style={{
                backgroundColor: proj.color,
                minHeight: "340px",
                boxShadow: "0 -20px 50px rgba(0,0,0,0.5)",
                borderTop: "1px solid rgba(255,255,255,0.15)",
                borderLeft: "1px solid rgba(255,255,255,0.05)",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                borderBottom: "1px solid rgba(0,0,0,0.5)",
                transformOrigin: "top center",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                WebkitFontSmoothing: "antialiased",
                ...(window.innerWidth >= 768 ? { height: "70vh", maxHeight: "500px" } : {})
              }}
            >
              <div className="flex-1 md:flex-[0.8] flex flex-col h-full overflow-hidden order-2 md:order-1">
                <div
                  className="flex-1 overflow-y-auto pr-2"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {(proj.featured || proj.event) && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {proj.featured && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full">
                          <Star className="w-3 h-3" /> Featured
                        </span>
                      )}
                      {proj.event && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full">
                          <Sparkles className="w-3 h-3" /> {proj.event}
                        </span>
                      )}
                    </div>
                  )}

                  <h2 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight leading-tight text-white">
                    {proj.title}
                  </h2>

                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-5 font-medium opacity-90">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {proj.tech.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 md:pt-6 mt-2 border-t border-white/10 flex flex-wrap gap-3 shrink-0">
                  {proj.github && proj.github !== "#" && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white border border-gray-600 text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
                    >
                      <Github className="w-[18px] h-[18px]" /> GitHub
                    </a>
                  )}
                  {proj.demo && proj.demo !== "#" && (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg"
                    >
                      <ExternalLink className="w-[18px] h-[18px]" /> Live
                    </a>
                  )}
                  <button
                    onClick={() => navigate(`/project/${proj.id}`)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-500/30 text-gray-200 border border-gray-500/50 text-sm font-bold rounded-xl hover:bg-gray-500/50 transition-colors shadow-lg"
                  >
                    View Details <ArrowRight className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </div>

              <div className="w-full h-[180px] md:h-full md:flex-[1.2] flex items-center justify-center order-1 md:order-2 shrink-0">
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  className="max-w-full max-h-full object-contain rounded-xl border border-white/10 shadow-2xl drop-shadow-2xl select-none"
                />
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Projects;