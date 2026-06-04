import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";
import certIbm from "@/assets/cert-ibm.png";
import certUdemyHtml from "@/assets/cert-udemy-html.jpg";

const certs = [
  {
    title: "HTML and CSS for Web Designers: From Basics to Beautiful",
    issuer: "Udemy",
    date: "April 2026",
    image: certUdemyHtml,
    href: "https://ude.my/UC-d02ea3c0-c70a-48cc-b289-9766706fdaf5",
  },
  {
    title: "Web Development Basics (MDL-261)",
    issuer: "IBM SkillsBuild",
    date: "April 2025",
    image: certIbm,
    href: "#",
  },
  {
    title: "Complete Web Development",
    issuer: "Udemy",
    date: "2025",
    image: null,
    href: "/cert-udemy-complete.pdf",
  },
];

const Certifications = () => (
  <section id="certifications" className="section-band py-20 sm:py-24">
    <div className="container">
      <SectionHeading eyebrow="Certifications" title="Learning & Credentials" description="Courses and certificates completed during my web development journey." />

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certs.map((cert, index) => (
          <motion.a
            key={cert.title}
            href={cert.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -5 }}
            className="glass group flex flex-col overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-elegant"
          >
            <div className="relative aspect-video overflow-hidden bg-secondary/55">
              {cert.image ? (
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                  <BadgeCheck className="h-14 w-14" />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                {cert.issuer} - {cert.date}
              </span>
              <h3 className="mb-4 flex-1 font-bold leading-snug">{cert.title}</h3>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                View Certificate
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
