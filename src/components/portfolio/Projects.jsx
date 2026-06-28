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
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const wrapperRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRefs.current;
      
      gsap.fromTo(".project-card", 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#projects",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      const cards = document.querySelectorAll(".project-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        
        gsap.to(card, {
          scale: 0.92,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: `top ${window.innerHeight * 0.12}`,
            end: () => `+=${window.innerHeight}`,
            scrub: true
          }
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      <div className="container mx-auto px-4 pt-20 sm:pt-24 pb-12">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've Built"
          description="A selection of things I've built recently"
        />
      </div>

      <div className="relative pb-20">
        <div className="bento-grid">
          {projects.map((proj, index) => (
            <div 
              key={proj.id || index}
              ref={el => {
                if (el) wrapperRefs.current[index] = el;
              }}
              className={`project-card-wrapper ${index === 0 ? 'col-span-1 md:col-span-2' : ''}`}
            >
              <div className="project-card">
                <div className="project-content">
                  <div className="project-info">
                    {(proj.featured || proj.event) && (
                      <div className="flex gap-2 mb-4">
                        {proj.featured && (
                          <span className="badge badge-featured">
                            <Star className="w-3 h-3" />
                            Featured
                          </span>
                        )}
                        {proj.event && (
                          <span className="badge badge-event">
                            <Sparkles className="w-3 h-3" />
                            {proj.event}
                          </span>
                        )}
                      </div>
                    )}

                    <h3 className="project-title">{proj.title}</h3>
                    <p className="project-desc">{proj.description}</p>

                    <div className="tech-stack">
                      {proj.tech.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>

                    <div className="project-actions">
                      {proj.github && proj.github !== "#" && (
                        <a href={proj.github} target="_blank" rel="noreferrer" className="btn btn-github">
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      )}
                      {proj.demo && proj.demo !== "#" && (
                        <a href={proj.demo} target="_blank" rel="noreferrer" className="btn btn-live">
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      <button 
                        onClick={() => navigate(`/project/${proj.id}`)}
                        className="btn btn-details"
                      >
                        Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="project-image">
                    <img 
                      src={proj.image} 
                      alt={proj.title}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;