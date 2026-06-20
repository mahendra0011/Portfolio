import { motion } from "framer-motion";
import { ArrowRight, Code2, Rocket, ServerCog, ShieldCheck, Smartphone, Wrench } from "lucide-react";
import MagneticButton from "@/components/reactbits/MagneticButton";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { Button } from "@/components/ui/button";
import { handleHashLinkClick } from "@/lib/scrollToHash";
import SectionHeading from "./SectionHeading";

const services = [
  {
    Icon: Code2,
    title: "Full-Stack Web Development",
    description:
      "Building modern, scalable and high-performance web applications with seamless user experiences and robust backend architecture. From responsive interfaces and secure APIs to database management and cloud deployment, every solution is designed for reliability, performance and long-term scalability.",
    highlights: ["Modern apps", "Secure APIs", "Cloud-ready"],
  },
  {
    Icon: Smartphone,
    title: "Frontend Development",
    description:
      "Crafting modern, responsive and user-focused interfaces that deliver seamless experiences across desktop, tablet and mobile devices. Every interface is designed with performance, accessibility, usability and visual consistency in mind.",
    highlights: ["Responsive UI", "Accessibility", "Clean UX"],
  },
  {
    Icon: ServerCog,
    title: "Backend & API Development",
    description:
      "Developing secure, scalable and well-structured backend systems that power modern web applications. From authentication, authorization and database management to RESTful APIs, business logic, file handling, real-time features and integrations.",
    highlights: ["Auth systems", "REST APIs", "Real-time"],
  },
  {
    Icon: ShieldCheck,
    title: "Security & Performance Optimization",
    description:
      "Implementing essential security measures and optimization strategies to keep applications fast, stable and protected. This includes secure API practices, input validation, rate limiting, performance tuning, caching and database optimization.",
    highlights: ["Validation", "Caching", "DB tuning"],
  },
  {
    Icon: Rocket,
    title: "Cloud Deployment & Infrastructure",
    description:
      "Deploying and managing production-ready applications using modern cloud platforms and deployment workflows. Experienced with Docker, AWS services, Nginx, SSL setup, reverse proxies, load balancing, domains and automated deployments with Vercel or Render.",
    highlights: ["Docker", "AWS/Nginx", "Vercel/Render"],
  },
  {
    Icon: Wrench,
    title: "Custom Business Solutions",
    description:
      "Developing tailored web applications ranging from business platforms and booking systems to management dashboards, SaaS products and marketplace solutions. Every project is built with scalability, usability and long-term maintainability in mind.",
    highlights: ["SaaS", "Dashboards", "Marketplaces"],
  },
];

const Services = () => (
  <section id="services" className="section-grid section-grid-soft relative overflow-hidden bg-muted/30 py-20 sm:py-24">
    <div className="container relative z-10">
      <SectionHeading
        eyebrow="Services"
        title="Services I Provide"
        description="Development support for modern web products, from interface design and backend systems to deployment, optimization and custom business platforms."
      />

      <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ Icon, title, description, highlights }, index) => (
          <SpotlightCard
            key={title}
            as={motion.article}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.42, delay: index * 0.055 }}
            whileHover={{ y: -6 }}
            className="group flex h-full min-h-[360px] flex-col rounded-lg glass bg-background/70 p-5 shadow-sm transition-all hover:bg-background hover:shadow-glow"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg gradient-bg shadow-glow transition-transform group-hover:scale-105">
              <Icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {highlights.map((highlight) => (
                <span key={highlight} className="rounded-full bg-secondary/80 px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                  {highlight}
                </span>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <MagneticButton>
          <Button size="lg" asChild className="group gradient-bg shadow-glow">
            <a href="#contact" onClick={(event) => handleHashLinkClick(event, "#contact")}>
              Discuss a Project
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </MagneticButton>
      </div>
    </div>
  </section>
);

export default Services;
