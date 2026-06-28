import { motion } from "framer-motion";
import { ArrowRight, Code2, Rocket, ServerCog, ShieldCheck, Smartphone, Wrench } from "lucide-react";
import MagneticButton from "@/components/reactbits/MagneticButton";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import ElectricBorder from "@/components/reactbits/ElectricBorder";
import { Button } from "@/components/ui/button";
import { handleHashLinkClick } from "@/lib/scrollToHash";
import SectionHeading from "./SectionHeading";
import { useTheme } from "@/hooks/useTheme";
import { useFloating, autoUpdate, offset, flip, shift, useHover, useFocus, useDismiss, useRole, useInteractions, FloatingPortal } from "@floating-ui/react";
import { useState } from "react";

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

const highlightDescriptions = {
  "Modern apps": "Building SPAs, SSR, SSG with React, Next.js and modern tooling",
  "Secure APIs": "RESTful & GraphQL APIs with JWT, OAuth and rate limiting",
  "Cloud-ready": "Deploy on AWS, Docker, Vercel with CI/CD pipelines",
  "Responsive UI": "Mobile-first, fluid layouts with Tailwind and CSS Grid",
  Accessibility: "WCAG 2.1 AA/AAA, keyboard nav, screen reader support",
  "Clean UX": "Intuitive interfaces with Framer Motion & micro-interactions",
  "Auth systems": "Auth0, JWT, OAuth2, session management & RBAC",
  "REST APIs": "Express, Fastify, NestJS with Swagger docs",
  "Real-time": "WebSockets, Socket.IO, SSE, WebRTC for live features",
  Validation: "Zod, Joi, Yup with type-safe error handling",
  Caching: "Redis, CDN, in-memory cache, HTTP cache headers",
  "DB tuning": "Indexing, query optimization, connection pooling",
  Docker: "Multi-stage builds, compose, swarm, k8s ready",
  "AWS/Nginx": "EC2, S3, CloudFront, reverse proxy, SSL termination",
  "Vercel/Render": "Zero-config deploy, serverless functions, preview deploys",
  SaaS: "Multi-tenant, subscription billing, usage tracking",
  Dashboards: "Recharts, AG Grid, data viz, real-time analytics",
  Marketplaces: "Stripe Connect, vendor management, search & filters",
};

const TooltipWrapper = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [offset(6), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const desc = highlightDescriptions[label];

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        className="rounded-full bg-secondary/80 px-2.5 py-1 text-xs font-semibold text-secondary-foreground cursor-help"
      >
        {children}
      </span>
      {desc && isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-50 max-w-[220px] rounded-lg bg-popover px-3 py-2 text-xs text-popover-foreground shadow-lg border border-border"
          >
            {desc}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

const Services = () => {
  const { theme } = useTheme();
  const isBento = theme === "bento";
  const isDark = theme === "dark";

  let glowColor = "#6B7280";
  if (isDark) glowColor = "#4A82E8";

  return (
    <section id="services" className="section-grid section-grid-soft relative overflow-hidden bg-muted/30 py-20 sm:py-24">
      <div className="container relative z-10">
        <SectionHeading
          eyebrow="Services"
          title="Services I Provide"
          description="Development support for modern web products, from interface design and backend systems to deployment, optimization and custom business platforms."
        />

        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ Icon, title, description, highlights }, index) => {
            // Use ElectricBorder + SpotlightCard
            return (
              <ElectricBorder
                key={title}
                color={glowColor}
                speed={1}
                chaos={0.12}
                borderRadius={16}
                borderOffset={20}
                className="h-full"
              >
                <SpotlightCard
                  as={motion.article}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px 0px" }}
                  transition={{ duration: 0.12, delay: index * 0.01 }}
                  whileHover={{ y: -3 }}
                  className="group flex h-full flex-col rounded-lg glass bg-background/70 p-5 shadow-elegant transition-all hover:bg-background hover:shadow-glow"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg gradient-bg shadow-glow transition-transform group-hover:scale-105">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  <div className="mt-auto pt-5 flex flex-wrap gap-2">
                    {highlights.map((highlight) => (
                      <TooltipWrapper key={highlight} label={highlight}>
                        {highlight}
                      </TooltipWrapper>
                    ))}
                  </div>
                </SpotlightCard>
              </ElectricBorder>
            );
          })}
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
};

export default Services;