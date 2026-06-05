import { motion } from "framer-motion";
import { ExternalLink, BadgeCheck } from "lucide-react";
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
const Certifications = () => (<section id="certifications" className="py-24 bg-muted/30 relative">
    <div className="container">
      <SectionHeading eyebrow="Certifications" title="Learning & Credentials" description="Courses and certifications I've completed"/>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {certs.map((c, i) => (<motion.a key={c.title} href={c.href} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -8 }} className="glass rounded-2xl overflow-hidden hover:shadow-glow transition-all group flex flex-col">
            <div className="aspect-video bg-muted relative overflow-hidden">
              {c.image ? (<img src={c.image} alt={`${c.title} certificate`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>) : (<div className="w-full h-full flex items-center justify-center gradient-bg">
                  <BadgeCheck className="w-16 h-16 text-primary-foreground"/>
                </div>)}
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <span className="text-xs font-semibold gradient-text uppercase tracking-wider mb-1">
                {c.issuer} · {c.date}
              </span>
              <h3 className="font-bold mb-3 flex-1">{c.title}</h3>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                View Certificate <ExternalLink className="w-3.5 h-3.5"/>
              </span>
            </div>
          </motion.a>))}
      </div>
    </div>
  </section>);
export default Certifications;
