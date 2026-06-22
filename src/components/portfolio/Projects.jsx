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

const Card = ({ project, index }) => {
    const ref = useRef(null);

    // CRITICAL: track the NON-sticky wrapper div, NOT the card itself.
    // "start end" = wrapper's top hits viewport bottom (entering)
    // "start start" = wrapper's top hits viewport top
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"],
    });

    const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

    return (
        <div ref={ref} className="relative" style={{ height: "200vh" }}>
            <div
                className="h-screen w-full sticky top-0 flex items-center justify-center px-4"
                style={{ top: `calc(12vh + ${index * 12}px)` }}
            >
                <motion.div
                    style={{
                        scale: cardScale,
                        backgroundColor: project.color,
                    }}
                    className="w-full max-w-[1200px] md:w-[90vw] h-[70vh] max-h-[500px] min-h-[400px] rounded-[28px] p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 shadow-[0_-20px_50px_rgba(0,0,0,0.6)] border-t border-white/15 border-l border-white/5 border-r border-white/5 border-b border-black/50 will-change-transform origin-top"
                >
                    <div className="flex-1 flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight leading-tight">
                                {project.title}
                            </h2>
                            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-medium opacity-90">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {project.tech.map((tech) => (
                                    <span key={tech} className="bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 mt-2 border-t border-white/10 flex flex-wrap gap-3">
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white border border-gray-600 text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg">
                                    <Github className="w-[18px] h-[18px]" /> Code
                                </a>
                            )}
                            {project.demo && (
                                <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg">
                                    <ExternalLink className="w-[18px] h-[18px]" /> Live
                                </a>
                            )}
                            {project.featured && (
                                <span className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 text-white text-sm font-bold rounded-xl shadow-lg">
                                    <Star className="w-[18px] h-[18px]" /> Featured
                                </span>
                            )}
                            {project.event && (
                                <span className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 text-white text-sm font-bold rounded-xl shadow-lg">
                                    <Sparkles className="w-[18px] h-[18px]" /> {project.event}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 rounded-2xl overflow-hidden bg-black/30 border border-white/5 min-h-[200px] md:min-h-0 hidden md:block">
                        <img
                            src={project.image}
                            alt={project.imageAlt}
                            loading="lazy"
                            decoding="async"
                            draggable="false"
                            className="w-full h-full object-cover select-none"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="bg-slate-950">
            <div className="container mx-auto px-4 pt-20 sm:pt-24 pb-12">
                <SectionHeading
                    eyebrow="Projects"
                    title="Things I've Built"
                    description="A selection of things I've built recently"
                />
            </div>

            <main className="relative">
                {projects.map((project, i) => (
                    <Card key={project.title} project={project} index={i} />
                ))}
            </main>
        </section>
    );
};

export default Projects;