import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Star, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

// TEMP DEBUG ONLY — lets you check things in the browser console, e.g.:
//   window.__gsap.ScrollTrigger.getAll().length
// Safe to remove once parallax is confirmed working.
if (typeof window !== 'undefined') {
    window.__gsap = { gsap, ScrollTrigger };
}

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

const Projects = () => {
    const cardsRef = useRef([]);

    useEffect(() => {
        // NOTE: No local Lenis instance is created here.
        // A global Lenis instance already runs (see src/hooks/useSmoothScroll.jsx,
        // exposed as window.__portfolioLenis with autoRaf: true) and is already
        // synced with GSAP's ScrollTrigger at the app level. Creating a second
        // Lenis + requestAnimationFrame loop inside this section was the bug:
        // two competing scroll/rAF loops fighting each other is what broke the
        // stacking parallax. So this section only registers its own
        // ScrollTrigger animations and relies on the existing global driver.

        let ctx;
        let cancelled = false;
        let cleanupFns = [];

        // The page's OakameLoader locks document.body scroll
        // (document.body.style.overflow = 'hidden') while it counts up, and
        // only unlocks it once finished, adding a "loaded" class to <body>.
        // If GSAP/ScrollTrigger sets up and measures positions while that
        // lock is still active, it gets skewed/negative start & end values
        // (confirmed via window.__gsap.ScrollTrigger.getAll() while the
        // loader was active) — that was the real cause of the stacking
        // effect never firing. So we wait for the loader to actually finish
        // before doing any GSAP setup/measurement at all.
        const waitForLoader = () =>
            new Promise((resolve) => {
                if (document.body.classList.contains('loaded')) {
                    resolve();
                    return;
                }
                const observer = new MutationObserver(() => {
                    if (document.body.classList.contains('loaded')) {
                        observer.disconnect();
                        resolve();
                    }
                });
                observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
                // Safety fallback in case the loader is ever skipped/removed.
                const fallback = setTimeout(() => {
                    observer.disconnect();
                    resolve();
                }, 8000);
                cleanupFns.push(() => {
                    observer.disconnect();
                    clearTimeout(fallback);
                });
            });

        waitForLoader().then(() => {
            if (cancelled) return;

            // One more frame so the loader's unmount/exit transition has
            // fully settled before GSAP measures anything.
            requestAnimationFrame(() => {
                if (cancelled) return;

                ctx = gsap.context(() => {
                    const cards = cardsRef.current;

                    cards.forEach((wrapper, i) => {
                        if (!wrapper) return;
                        if (i === cards.length - 1) return; // Last card stays static

                        const cardInner = wrapper.querySelector('.project-card');
                        if (!cardInner) return;

                        gsap.to(cardInner, {
                            scale: 0.92, // keeps the thick-stack look
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
                });

                ScrollTrigger.refresh();
            });
        });

        // Re-measure if heights change after the fact (fonts, late images).
        const refresh = () => ScrollTrigger.refresh();

        window.addEventListener('load', refresh);
        cleanupFns.push(() => window.removeEventListener('load', refresh));

        if (document.fonts?.ready) {
            document.fonts.ready.then(refresh).catch(() => {});
        }

        const images = Array.from(document.querySelectorAll('#projects img'));
        images.forEach((img) => {
            if (!img.complete) {
                img.addEventListener('load', refresh, { once: true });
                img.addEventListener('error', refresh, { once: true });
                cleanupFns.push(() => {
                    img.removeEventListener('load', refresh);
                    img.removeEventListener('error', refresh);
                });
            }
        });

        const resizeRefresh = () => ScrollTrigger.refresh();
        window.addEventListener('resize', resizeRefresh);
        cleanupFns.push(() => window.removeEventListener('resize', resizeRefresh));

        return () => {
            cancelled = true;
            cleanupFns.forEach((fn) => fn());
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <section id="projects" className="relative bg-slate-950 text-white">

            {/* Scrollbar hide styles */}
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

            {/* Projects Container */}
            <main className="relative pb-[10vh]">
                {projects.map((proj, index) => (
                    <div
                        key={proj.title}
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
                            {/* Left Side: Content Wrapper */}
                            <div className="flex-1 flex flex-col h-full">

                                {/* Text Content (Scrollable) */}
                                <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
                                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight leading-tight">
                                        {proj.title}
                                    </h2>
                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-medium opacity-90">
                                        {proj.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {proj.tech.map((tag) => (
                                            <span key={tag} className="bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Buttons Container (Pinned at Bottom) */}
                                <div className="pt-6 mt-2 border-t border-white/10 flex flex-wrap gap-3">
                                    {proj.github && (
                                        <a href={proj.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white border border-gray-600 text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg">
                                            <Github className="w-[18px] h-[18px]" /> Code
                                        </a>
                                    )}
                                    {proj.demo && (
                                        <a href={proj.demo} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg">
                                            <ExternalLink className="w-[18px] h-[18px]" /> Live
                                        </a>
                                    )}
                                    {proj.featured && (
                                        <span className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 text-white text-sm font-bold rounded-xl shadow-lg">
                                            <Star className="w-[18px] h-[18px]" /> Featured
                                        </span>
                                    )}
                                    {proj.event && (
                                        <span className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 text-white text-sm font-bold rounded-xl shadow-lg">
                                            <Sparkles className="w-[18px] h-[18px]" /> {proj.event}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Right Side: Image */}
                            <div className="flex-1 rounded-2xl overflow-hidden bg-black/30 border border-white/5 min-h-[200px] md:min-h-0 hidden md:block">
                                {proj.image ? (
                                    <img
                                        src={proj.image}
                                        alt={proj.imageAlt}
                                        loading="eager"
                                        decoding="async"
                                        draggable="false"
                                        className="w-full h-full object-cover select-none"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-white/10 flex items-center justify-center">
                                        <span className="text-white/30 text-6xl font-bold">{proj.title[0]}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </section>
    );
};

export default Projects;
