import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, School, Award } from "lucide-react";
import SectionHeading from "./SectionHeading";
const items = [
    {
        icon: GraduationCap,
        period: "2023 — 2027",
        title: "B.Tech — Electronics & Communication Engineering",
        place: "Shri Ram Institute of Technology, Jabalpur (M.P.)",
        description: "Currently pursuing with CGPA 7.1/10 while building real-world full-stack MERN projects.",
    },
    {
        icon: School,
        period: "2022 — 2023",
        title: "Class XII — Higher Secondary (MP Board)",
        place: "Saraswati Shiksha Mandir, Jabalpur (M.P.)",
        description: "Completed higher secondary education with 61%.",
    },
    {
        icon: Award,
        period: "2020 — 2021",
        title: "Class X — Secondary (MP Board)",
        place: "Saraswati Shiksha Mandir, Jabalpur (M.P.)",
        description: "Completed secondary education with 81%.",
    },
];

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".education-timeline-line",
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 68%",
                        end: "bottom 58%",
                        scrub: 0.75,
                    },
                },
            );

            gsap.fromTo(
                ".education-timeline-dot",
                { autoAlpha: 0, scale: 0.25, rotate: -28 },
                {
                    autoAlpha: 1,
                    scale: 1,
                    rotate: 0,
                    duration: 0.58,
                    ease: "back.out(2.4)",
                    stagger: 0.18,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 62%",
                    },
                },
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (<section ref={sectionRef} id="education" className="section-grid relative overflow-hidden bg-muted/30 py-20 sm:py-24">
      <div className="container relative z-10">
        <SectionHeading eyebrow="Journey" title="Education"/>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="education-timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 gradient-bg md:-translate-x-1/2"/>

          {items.map((item, i) => (<motion.div key={item.title} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className={`relative mb-10 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"} pl-12 md:pl-0`}>
              {/* Dot */}
              <div className={`education-timeline-dot absolute top-4 w-8 h-8 rounded-full gradient-bg shadow-glow flex items-center justify-center ${i % 2 === 0 ? "left-0 md:left-auto md:-right-4" : "left-0 md:-left-4"}`}>
                <item.icon className="w-4 h-4 text-primary-foreground"/>
              </div>
              <div className="education-timeline-card glass rounded-2xl p-6 hover:shadow-glow transition-all">
                <span className="text-xs font-semibold gradient-text uppercase tracking-wider">{item.period}</span>
                <h3 className="text-lg font-bold mt-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-medium mb-2">{item.place}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>))}
        </div>
      </div>
    </section>);
};
export default Education;
