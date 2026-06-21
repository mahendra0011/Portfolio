import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, Star, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";

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
        imageAlt: "MediCore healthcare landing page screenshot",
        color: "#BBACAF",
    },
    {
        title: "EventO - Event Booking Platform",
        description:
            "Event booking platform for public discovery, ticket booking with OTP verification, host dashboards, attendee messaging, support tickets, admin controls, reports and Render-ready deployment.",
        tech: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "OTP", "Reports"],
        github: "https://github.com/mahendra0011/EventO",
        demo: "http://evento-1645479696.us-east-2.elb.amazonaws.com/",
        image: "/projects/evento.png",
        imageAlt: "EventO event booking platform landing page screenshot",
        color: "#977F6D",
    },
    {
        title: "MindSupport - Mental Wellness Platform",
        description:
            "Smart India Hackathon 2025 mental wellness solution with counsellor discovery, role dashboards, verification, scheduling, Google Meet support, secure chat, wellness tracking, payments, reviews and admin moderation.",
        tech: ["JavaScript", "React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Payments"],
        github: "https://github.com/mahendra0011/mindSupport",
        demo: "https://mindsupport-1.onrender.com/",
        event: "Smart India Hackathon 2025",
        image: "/projects/mindsupport.png",
        imageAlt: "MindSupport mental wellness platform landing page screenshot",
        color: "#C2491D",
    },
    {
        title: "MoviX - Movie Ticket Booking Platform",
        description:
            "Full-stack movie ticket booking platform for browsing movies, coming-soon releases, seat selection, ticket booking, theater management and admin or owner workflows.",
        tech: ["React", "Node.js", "Express.js", "MongoDB", "Cloudinary", "JWT"],
        github: "https://github.com/mahendra0011/movix",
        demo: "https://movix-p8ez.onrender.com",
        image: "/projects/movix.png",
        imageAlt: "MoviX movie ticket booking platform landing page screenshot",
        color: "#6B8E23",
    },
    {
        title: "RentPE - Room Rental Marketplace",
        description:
            "Room rental marketplace for students, interns, job seekers and movers. Seekers compare PGs, hostels, flats and rooms while owners publish listings using city, area, landmark, title, amenities, rules and descriptions.",
        tech: ["React", "Node.js", "Express.js", "MongoDB", "Search", "Marketplace"],
        github: "https://github.com/mahendra0011/RentPE",
        demo: "https://rentpe-j7bq.onrender.com",
        image: "/projects/rentpe.png",
        imageAlt: "RentPE room rental marketplace landing page screenshot",
        color: "#4A6741",
    },
    {
        title: "TempTalk - Anonymous Chat Platform",
        description:
            "Privacy-focused anonymous chat platform with encrypted messaging, real-time Socket.IO rooms, media sharing, temporary chat rooms, PWA and Android support, deep links and QR invites.",
        tech: ["React", "Express.js", "Socket.IO", "MongoDB", "PWA", "Android"],
        github: "https://github.com/mahendra0011/TempTalk",
        demo: "https://temptalk-1.onrender.com",
        image: "/projects/temptalk.png",
        imageAlt: "TempTalk anonymous chat platform landing page screenshot",
        color: "#5B4E77",
    },
    {
        title: "StudyBuddy - AI Study Platform",
        description:
            "AI-powered study platform using Gemini AI to generate structured notes, summarize PDFs and YouTube lectures, manage study tasks and organize personalized content libraries with secure authentication.",
        tech: ["React", "Node.js", "Express.js", "MongoDB", "Gemini AI", "PDF", "YouTube"],
        github: "https://github.com/mahendra0011/StudyBuddy",
        demo: "https://studybuddy-86s2.onrender.com",
        image: "/projects/studybuddy.png",
        imageAlt: "StudyBuddy AI study platform landing page screenshot",
        color: "#3D5A80",
    },
    {
        title: "LostAndFound - Recovery Platform",
        description:
            "Full-stack MERN application for reporting, searching and recovering lost items with JWT authentication, image uploads, advanced search and filtering, item status management and responsive recovery workflows.",
        tech: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Image Uploads"],
        github: "https://github.com/mahendra0011/Lost-and-Found-Website.git",
        demo: "https://lost-and-found-xlvq.onrender.com/",
        image: "/projects/lost-and-found.png",
        imageAlt: "LostAndFound platform landing page screenshot",
        color: "#8B3A3A",
    },
];

const Card = ({ project, i, progress, range, targetScale, count }) => {
    const cardScale = useTransform(progress, range, [1, targetScale]);
    
    return (
        <div
            className="h-screen w-full sticky top-0 flex items-center justify-center px-4"
            style={{ top: `calc(12vh + ${i * 12}px)` }}
        >
            <motion.div
                style={{
                    scale: cardScale,
                    backgroundColor: project.color,
                }}
                className="w-full max-w-5xl h-[500px] rounded-[25px] overflow-hidden shadow-2xl will-change-transform"
            >
                    {/* LEFT - Description */}
                    <div className="flex-1 flex flex-col justify-center px-8 lg:px-12 py-8 text-white">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-3">{project.title}</h2>
                        <p className="text-sm text-white/80 leading-relaxed mb-5 line-clamp-4">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-5">
                            {project.tech.map((tech) => (
                                <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-white font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors">
                                    <Github className="w-4 h-4" /> Code
                                </a>
                            )}
                            {project.demo && (
                                <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors">
                                    <ExternalLink className="w-4 h-4" /> Live
                                </a>
                            )}
                            {project.featured && (
                                <span className="flex items-center gap-1 text-xs text-white/50"><Star className="w-3 h-3" /> Featured</span>
                            )}
                            {project.event && (
                                <span className="flex items-center gap-1 text-xs text-white/50"><Sparkles className="w-3 h-3" /> {project.event}</span>
                            )}
                        </div>
                    </div>

                    {/* RIGHT - Image */}
                    <div className="flex-1 min-h-[200px] lg:min-h-0 relative overflow-hidden">
                        <div className="h-full w-full overflow-hidden">
                            <img 
                                src={project.image} 
                                alt={project.imageAlt} 
                                loading="lazy" 
                                decoding="async" 
                                draggable="false" 
                                className="h-full w-full object-cover select-none"
                                onError={(e) => {
                                    const text = encodeURIComponent(project.title.split(' -')[0].split(' (')[0]);
                                    e.target.src = `https://via.placeholder.com/800x600/000000/ffffff?text=${text}`;
                                }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Projects = () => {
    const container = useRef(null);
    const count = projects.length;

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    return (
        <section id="projects" className="relative">
            <div className="container mx-auto px-4 pt-20 sm:pt-24 pb-12">
                <SectionHeading
                    eyebrow="Projects"
                    title="Things I've Built"
                    description="A selection of things I've built recently"
                />
            </div>

            <main ref={container} className="relative" style={{ height: `${count * 100}vh` }}>
                {projects.map((project, i) => {
                    const targetScale = 1 - (count - i) * 0.05;
                    const start = i / count;
                    const end = (i + 1) / count;
                    const range = [start, end];
                    return (
                        <Card
                            key={project.title}
                            i={i}
                            project={project}
                            progress={scrollYProgress}
                            range={range}
                            targetScale={targetScale}
                            count={count}
                        />
                    );
                })}
            </main>
        </section>
    );
};

export default Projects;