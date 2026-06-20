import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeIndianRupee,
  Braces,
  ChartNoAxesCombined,
  FileCode2,
  FileSpreadsheet,
  FileText,
  MapPinned,
  Monitor,
  Route,
  Server,
} from "lucide-react";
import {
  SiApachekafka,
  SiAxios,
  SiBrevo,
  SiCloudinary,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiFiles,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGsap,
  SiGooglecloud,
  SiHostinger,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMinutemailer,
  SiMui,
  SiMysql,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiRazorpay,
  SiReact,
  SiReactrouter,
  SiRecoil,
  SiRedis,
  SiRender,
  SiRedux,
  SiScrollreveal,
  SiSendgrid,
  SiServerless,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiVercel,
  SiWebrtc,
} from "react-icons/si";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import SectionHeading from "./SectionHeading";

const groups = [
  {
    title: "Frontend",
    items: [
      { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", Icon: SiCss, color: "#1572B6" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", Icon: SiFramer, color: "#0055FF" },
      { name: "GSAP", Icon: SiGsap, color: "#88CE02" },
      { name: "Lenis", Icon: SiScrollreveal, color: "#5D40F7" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "FlexSearch", Icon: Braces, color: "#334155" },
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "React Router", Icon: SiReactrouter, color: "#CA4245" },
      { name: "React Charts", Icon: ChartNoAxesCombined, color: "#0EA5E9" },
      { name: "Redux", Icon: SiRedux, color: "#764ABC" },
      { name: "Recoil", Icon: SiRecoil, color: "#3578E5" },
      { name: "MUI", Icon: SiMui, color: "#007FFF" },
      { name: "shadcn/ui", Icon: SiShadcnui, color: "currentColor" },
      { name: "ReactBits", Icon: FileCode2, color: "#7C3AED" },
      {
        name: "Lightwind UI",
        Icon: ({ className, style }) => <img src="https://camo.githubusercontent.com/c824ce4a5883445f6823b066d241e5b64d28568ce78ec61c6e8351a24af9808c/68747470733a2f2f636f6465776974686d7568696c616e2e636f6d2f45787472612d4173736574732f6c6967687477696e642d6c6f676f2e706e67" alt="Lightwind UI" className={`${className} object-contain`} style={style} />,
        color: "#36B7F0",
      },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", Icon: SiExpress, color: "currentColor" },
      { name: "REST API", Icon: Route, color: "#2563EB" },
      { name: "Multer", Icon: SiFiles, color: "#1677FF" },
      { name: "WebRTC", Icon: SiWebrtc, color: "#EF4444" },
      { name: "JWT", Icon: SiJsonwebtokens, color: "#D63AFF" },
      { name: "Axios", Icon: SiAxios, color: "#5A29E4" },
      { name: "Socket.IO", Icon: SiSocketdotio, color: "currentColor" },
      { name: "Redis", Icon: SiRedis, color: "#DC382D" },
      { name: "Kafka", Icon: SiApachekafka, color: "#231F20" },
      { name: "PDFKit", Icon: FileText, color: "currentColor" },
      { name: "Nodemailer", Icon: SiMinutemailer, color: "#FF6C37" },
    ],
  },
  {
    title: "Database & Services",
    items: [
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
      { name: "Supabase", Icon: SiSupabase, color: "#3FCF8E" },
      { name: "Cloudinary", Icon: SiCloudinary, color: "#3448C5" },
      { name: "Brevo", Icon: SiBrevo, color: "#0B996E" },
      { name: "SendGrid", Icon: SiSendgrid, color: "#1A82E2" },
      { name: "Razorpay", Icon: SiRazorpay, color: "#0C2451" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "Cashfree", Icon: BadgeIndianRupee, color: "#00B386" },
    ],
  },
  {
    title: "Deployment & Tools",
    items: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "currentColor" },
      { name: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "Nginx", Icon: SiNginx, color: "#009639" },
      { name: "Vercel", Icon: SiVercel, color: "currentColor" },
      { name: "Render", Icon: SiRender, color: "#46E3B7" },
      {
        name: "AWS",
        Icon: ({ className, style }) => <img src="https://img.icons8.com/color/1200/amazon-web-services.jpg" alt="AWS" className={`${className} object-contain`} style={style} />,
        color: "#FF9900",
      },
      { name: "Google Cloud", Icon: SiGooglecloud, color: "#4285F4" },
      { name: "VPS", Icon: Server, color: "#64748B" },
      { name: "Serverless", Icon: SiServerless, color: "#FD5750" },
      { name: "Hostinger", Icon: SiHostinger, color: "#673DE6" },
      { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
      { name: "Excel", Icon: FileSpreadsheet, color: "#217346" },
      { name: "MapCN", Icon: MapPinned, color: "#10B981" },
      { name: "VS Code", Icon: Monitor, color: "#007ACC" },
      { name: "C++", Icon: SiCplusplus, color: "#00599C" },
    ],
  },
];

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-group-title",
        { autoAlpha: 0, x: 8 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.12,
          ease: "power1.out",
          stagger: 0.008,
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%" },
        },
      );

      gsap.fromTo(
        ".skill-chip",
        { autoAlpha: 0, y: 8, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.12,
          ease: "power1.out",
          stagger: 0.004,
          scrollTrigger: { trigger: sectionRef.current, start: "top 86%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="section-grid section-grid-soft relative overflow-hidden bg-muted/30 py-20 sm:py-24">
      <div className="container relative z-10">
        <SectionHeading eyebrow="Skills" title="Technologies I work with" description="The stack I use to bring ideas to life" />

        <div className="mx-auto max-w-7xl space-y-12">
          {groups.map((group) => (
            <div
              key={group.title}
            >
              <h3 className="skill-group-title mb-4 text-xl font-bold text-muted-foreground md:text-2xl">{group.title}</h3>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {group.items.map(({ name, Icon, color }) => (
<SpotlightCard
                      key={`${group.title}-${name}`}
                      as={motion.div}
                      whileHover={{ y: -2 }}
                      className="skill-chip group inline-flex h-16 min-w-[126px] items-center gap-3 rounded-lg border border-border/70 bg-background/70 px-4 shadow-sm transition-all hover:border-primary/40 hover:bg-background hover:shadow-elegant sm:min-w-[136px]"
                    >
                    <Icon
                      className="h-6 w-6 shrink-0 text-muted-foreground transition-transform group-hover:scale-110"
                      style={{ color }}
                    />
                    <span className="text-[15px] font-bold text-foreground">{name}</span>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
