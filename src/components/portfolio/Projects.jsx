import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "MediCore - Hospital Management System",
        description:
            "Full-stack hospital management system with patient, doctor and admin portals, OTP auth, appointments, records, lab services, billing, emergency cases, reports, notifications and PDF documents.",
        tags: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Multer", "Cloudinary", "PDFKit"],
        links: ["GitHub", "Live"],
        featured: true,
        image: "/projects/medicore.png",
        imageAlt: "MediCore healthcare landing page screenshot",
        color: "#BBACAF",
        ghLink: "https://github.com/mahendra0011/mediCore.git",
        demoLink: "https://medicore-main-1.onrender.com",
    },
    {
        title: "EventO - Event Booking Platform",
        description:
            "Event booking platform for public discovery, ticket booking with OTP verification, host dashboards, attendee messaging, support tickets, admin controls, reports and Render-ready deployment.",
        tags: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "OTP", "Reports"],
        links: ["GitHub", "Live"],
        featured: false,
        image: "/projects/evento.png",
        imageAlt: "EventO event booking platform landing page screenshot",
        color: "#977F6D",
        ghLink: "https://github.com/mahendra0011/EventO",
        demoLink: "http://evento-1645479696.us-east-2.elb.amazonaws.com/",
    },
    {
        title: "MindSupport - Mental Wellness Platform",
        description:
            "Smart India Hackathon 2025 mental wellness solution with counsellor discovery, role dashboards, verification, scheduling, Google Meet support, secure chat, wellness tracking, payments, reviews and admin moderation.",
        tags: ["JavaScript", "React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Payments"],
        links: ["GitHub", "Live", "SIH 2025"],
        featured: false,
        image: "/projects/mindsupport.png",
        imageAlt: "MindSupport mental wellness platform landing page screenshot",
        color: "#C2491D",
        ghLink: "https://github.com/mahendra0011/mindSupport",
        demoLink: "https://mindsupport-1.onrender.com/",
    },
    {
        title: "MoviX - Movie Ticket Booking Platform",
        description:
            "Full-stack movie ticket booking platform for browsing movies, coming-soon releases, seat selection, ticket booking, theater management and admin or owner workflows.",
        tags: ["React", "Node.js", "Express.js", "MongoDB", "Cloudinary", "JWT"],
        links: ["GitHub", "Live"],
        featured: false,
        image: "/projects/movix.png",
        imageAlt: "MoviX movie ticket booking platform landing page screenshot",
        color: "#6B8E23",
        ghLink: "https://github.com/mahendra0011/movix",
        demoLink: "https://movix-p8ez.onrender.com",
    },
    {
        title: "RentPE - Room Rental Marketplace",
        description:
            "Room rental marketplace for students, interns, job seekers and movers. Seekers compare PGs, hostels, flats and rooms while owners publish listings using city, area, landmark, title, amenities, rules and descriptions.",
        tags: ["React", "Node.js", "Express.js", "MongoDB", "Search", "Marketplace"],
        links: ["GitHub", "Live"],
        featured: false,
        image: "/projects/rentpe.png",
        imageAlt: "RentPE room rental marketplace landing page screenshot",
        color: "#4A6741",
        ghLink: "https://github.com/mahendra0011/RentPE",
        demoLink: "https://rentpe-j7bq.onrender.com",
    },
    {
        title: "TempTalk - Anonymous Chat Platform",
        description:
            "Privacy-focused anonymous chat platform with encrypted messaging, real-time Socket.IO rooms, media sharing, temporary chat rooms, PWA and Android support, deep links and QR invites.",
        tags: ["React", "Express.js", "Socket.IO", "MongoDB", "PWA", "Android"],
        links: ["GitHub", "Live"],
        featured: false,
        image: "/projects/temptalk.png",
        imageAlt: "TempTalk anonymous chat platform landing page screenshot",
        color: "#5B4E77",
        ghLink: "https://github.com/mahendra0011/TempTalk",
        demoLink: "https://temptalk-1.onrender.com",
    },
    {
        title: "StudyBuddy - AI Study Platform",
        description:
            "AI-powered study platform using Gemini AI to generate structured notes, summarize PDFs and YouTube lectures, manage study tasks and organize personalized content libraries with secure authentication.",
        tags: ["React", "Node.js", "Express.js", "MongoDB", "Gemini AI", "PDF", "YouTube"],
        links: ["GitHub", "Live"],
        featured: false,
        image: "/projects/studybuddy.png",
        imageAlt: "StudyBuddy AI study platform landing page screenshot",
        color: "#3D5A80",
        ghLink: "https://github.com/mahendra0011/StudyBuddy",
        demoLink: "https://studybuddy-86s2.onrender.com",
    },
    {
        title: "LostAndFound - Recovery Platform",
        description:
            "Full-stack MERN application for reporting, searching and recovering lost items with JWT authentication, image uploads, advanced search and filtering, item status management and responsive recovery workflows.",
        tags: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Image Uploads"],
        links: ["GitHub", "Live"],
        featured: false,
        image: "/projects/lost-and-found.png",
        imageAlt: "LostAndFound platform landing page screenshot",
        color: "#8B3A3A",
        ghLink: "https://github.com/mahendra0011/Lost-and-Found-Website.git",
        demoLink: "https://lost-and-found-xlvq.onrender.com/",
    },
    {
        title: "CloudNest - File System",
        description:
            "Full-stack file upload system — Users register, login with Google, upload files, and every file is stored in the owner's Google Drive.",
        tags: ["React", "Redux", "MUI", "Shadcn", "Socket.io", "Express"],
        links: ["GitHub", "Live"],
        featured: false,
        image: "/projects/placeholder.svg",
        imageAlt: "CloudNest file system screenshot",
        color: "#1e293b",
        ghLink: "https://github.com/mahendra0011",
        demoLink: "#",
    },
    {
        title: "⚡ IntegrateKit",
        description:
            "The definitive integration directory for MERN Stack developers — real code snippets, setup guides, and screenshots for integrating with 330+ services.",
        tags: ["React 18", "Vite", "Tailwind", "Framer Motion", "GSAP"],
        links: ["GitHub", "Live"],
        featured: false,
        image: "/projects/placeholder.svg",
        imageAlt: "IntegrateKit directory screenshot",
        color: "#0f172a",
        ghLink: "https://github.com/mahendra0011",
        demoLink: "#",
    },
    {
        title: "HireInterns",
        description:
            "A streamlined platform bridging the gap between innovative companies and talented interns looking for their next big opportunity.",
        tags: ["MERN", "Coming Soon"],
        links: ["GitHub", "Live"],
        featured: false,
        image: "/projects/placeholder.svg",
        imageAlt: "HireInterns platform screenshot",
        color: "#334155",
        ghLink: "https://github.com/mahendra0011",
        demoLink: "#",
    },
    {
        title: "One in A million",
        description:
            "An exclusive platform showcasing unique ideas, talents, and portfolios from extraordinary individuals worldwide.",
        tags: ["React", "Coming Soon"],
        links: ["GitHub", "Live"],
        featured: false,
        image: "/projects/placeholder.svg",
        imageAlt: "One in A million platform screenshot",
        color: "#020617",
        ghLink: "https://github.com/mahendra0011",
        demoLink: "#",
    },
    {
        title: "CivicIssue",
        description:
            "A community-driven platform to report, track, and resolve local civic issues directly with local authorities.",
        tags: ["React", "Node.js", "MongoDB"],
        links: ["GitHub", "Live"],
        featured: false,
        image: "/projects/placeholder.svg",
        imageAlt: "CivicIssue platform screenshot",
        color: "#1e293b",
        ghLink: "https://github.com/mahendra0011",
        demoLink: "#",
    },
    {
        title: "Project Nexus (Placeholder)",
        description:
            "A robust internal tool for managing workflow and tracking sprint velocities in agile development teams.",
        tags: ["Next.js", "Tailwind"],
        links: ["GitHub", "Live"],
        featured: false,
        image: "/projects/placeholder.svg",
        imageAlt: "Project Nexus screenshot",
        color: "#0f172a",
        ghLink: "https://github.com/mahendra0011",
        demoLink: "#",
    },
    {
        title: "Apex Fitness Club",
        description:
            "A high-performance modern frontend for a premium fitness club featuring interactive class schedules and personal trainer portfolios.",
        tags: ["Frontend", "UI/UX", "Coming Soon"],
        links: ["GitHub", "Live"],
        featured: false,
        image: "/projects/placeholder.svg",
        imageAlt: "Apex Fitness Club screenshot",
        color: "#334155",
        ghLink: "https://github.com/mahendra0011",
        demoLink: "#",
    },
];

const GithubIcon = () => (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const LiveIcon = () => (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const Projects = () => {
    const cardsRef = useRef([]);

    useEffect(() => {
        // Match HTML file pattern EXACTLY:
        // CSS sticky (NOT GSAP pin) + GSAP scale animation
        const rafId = requestAnimationFrame(() => {
            const cards = cardsRef.current;

            cards.forEach((wrapper, i) => {
                if (!wrapper) return;
                if (i === cards.length - 1) return;

                const card = wrapper.querySelector('.project-card');
                if (!card) return;

                gsap.to(card, {
                    scale: 0.92,
                    ease: "none",
                    scrollTrigger: {
                        trigger: wrapper,
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                });
            });

            ScrollTrigger.refresh();
        });

        return () => {
            cancelAnimationFrame(rafId);
            ScrollTrigger.getAll().forEach(t => t.kill());
            ScrollTrigger.refresh();
        };
    }, []);

    return (
        <section id="projects" className="relative bg-slate-950 text-white">

            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <div className="container mx-auto px-4 pt-20 sm:pt-24 pb-12">
                <SectionHeading
                    eyebrow="Projects"
                    title="Things I've Built"
                    description="A selection of things I've built recently"
                />
            </div>

            <main className="relative pb-[10vh]">
                {projects.map((proj, index) => (
                    <div
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className="h-screen flex items-start justify-center sticky px-4"
                        style={{ top: `calc(12vh + ${index * 12}px)` }}
                    >
                        <div
                            className="project-card origin-top w-full max-w-[1200px] md:w-[90vw] h-[70vh] max-h-[500px] min-h-[400px] rounded-[28px] p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 shadow-[0_-20px_50px_rgba(0,0,0,0.6)] border-t border-white/15 border-l border-white/5 border-r border-white/5 border-b border-black/50 will-change-transform"
                            style={{
                                backgroundColor: proj.color,
                                transform: 'translateZ(0)',
                                backfaceVisibility: 'hidden',
                                WebkitFontSmoothing: 'antialiased'
                            }}
                        >
                            <div className="flex-1 flex flex-col h-full">
                                <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
                                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight leading-tight">
                                        {proj.title}
                                    </h2>
                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-medium opacity-90">
                                        {proj.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {proj.tags.map((tag, tIndex) => (
                                            <span key={tIndex} className="bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 mt-2 border-t border-white/10 flex flex-wrap gap-3">
                                    {proj.links.map((link, lIndex) => {
                                        const label = link.toLowerCase();
                                        if (label.includes("github")) {
                                            return (
                                                <a key={lIndex} href={proj.ghLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white border border-gray-600 text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg">
                                                    <GithubIcon /> {link}
                                                </a>
                                            );
                                        } else if (label.includes("live") || label.includes("sih")) {
                                            return (
                                                <a key={lIndex} href={proj.demoLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg">
                                                    <LiveIcon /> {link}
                                                </a>
                                            );
                                        } else {
                                            return (
                                                <span key={lIndex} className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 text-white text-sm font-bold rounded-xl shadow-lg">
                                                    {link}
                                                </span>
                                            );
                                        }
                                    })}
                                    {proj.featured && (
                                        <span className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 text-white text-sm font-bold rounded-xl shadow-lg">
                                            ⭐ Featured
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 rounded-2xl overflow-hidden bg-black/30 border border-white/5 min-h-[200px] md:min-h-0 hidden md:block">
                                <img
                                    src={proj.image}
                                    alt={proj.imageAlt}
                                    loading="lazy"
                                    decoding="async"
                                    draggable="false"
                                    className="w-full h-full object-cover select-none"
                                    onError={(e) => {
                                        const text = encodeURIComponent(proj.title.split(' -')[0].split(' (')[0]);
                                        e.target.src = `https://via.placeholder.com/800x600/000000/ffffff?text=${text}`;
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </main>

            <div className="h-[40vh] flex flex-col items-center justify-center text-slate-500 text-xl gap-4">
                <p className="font-bold text-3xl tracking-tight">End of Projects</p>
                <p className="text-slate-600">That's all folks! ✨</p>
            </div>
        </section>
    );
};

export default Projects;