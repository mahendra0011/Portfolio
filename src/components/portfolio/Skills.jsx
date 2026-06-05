import { motion } from "framer-motion";
import { Cloud, Code2, FileSpreadsheet, FileText, Globe, Mail, Map, Monitor, Package, Plug, Search, ServerCog, Workflow } from "lucide-react";
import {
  SiAxios,
  SiCashapp,
  SiCloudinary,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGooglecloud,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNginx,
  SiNodedotjs,
  SiPostman,
  SiPython,
  SiRazorpay,
  SiReact,
  SiReactrouter,
  SiRecoil,
  SiRedis,
  SiRedux,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiWebrtc,
} from "react-icons/si";
import SectionHeading from "./SectionHeading";

const groups = [
  {
    title: "Frontend",
    items: [
      { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", Icon: SiCss, color: "#1572B6" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", Icon: SiFramer, color: "#0055FF" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "FlexSearch", Icon: Search, color: "currentColor" },
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "React Router", Icon: SiReactrouter, color: "#CA4245" },
      { name: "React Charts", Icon: Code2, color: "currentColor" },
      { name: "Redux", Icon: SiRedux, color: "#764ABC" },
      { name: "Recoil", Icon: SiRecoil, color: "#3578E5" },
      { name: "MUI", Icon: SiMui, color: "#007FFF" },
      { name: "shadcn/ui", Icon: SiShadcnui, color: "currentColor" },
      { name: "ReactBits", Icon: Code2, color: "currentColor" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", Icon: SiExpress, color: "currentColor" },
      { name: "REST API", Icon: Plug, color: "currentColor" },
      { name: "GraphQL", Icon: SiGraphql, color: "#E10098" },
      { name: "Multer", Icon: Package, color: "currentColor" },
      { name: "WebRTC", Icon: SiWebrtc, color: "#333333" },
      { name: "JWT", Icon: SiJsonwebtokens, color: "#000000" },
      { name: "Axios", Icon: SiAxios, color: "#5A29E4" },
      { name: "Socket.IO", Icon: SiSocketdotio, color: "currentColor" },
      { name: "Redis", Icon: SiRedis, color: "#DC382D" },
      { name: "PDFKit", Icon: FileText, color: "currentColor" },
      { name: "Nodemailer", Icon: Mail, color: "currentColor" },
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
      { name: "Brevo", Icon: Mail, color: "currentColor" },
      { name: "SendGrid", Icon: Mail, color: "currentColor" },
      { name: "Razorpay", Icon: SiRazorpay, color: "#0C2451" },
      { name: "Cashfree", Icon: SiCashapp, color: "#00D64F" },
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
      { name: "AWS", Icon: Cloud, color: "#FF9900" },
      { name: "Google Cloud", Icon: SiGooglecloud, color: "#4285F4" },
      { name: "VPS", Icon: ServerCog, color: "currentColor" },
      { name: "Serverless", Icon: Workflow, color: "#FD5750" },
      { name: "Hostinger", Icon: Globe, color: "currentColor" },
      { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
      { name: "Excel", Icon: FileSpreadsheet, color: "#217346" },
      { name: "MapCN", Icon: Map, color: "currentColor" },
      { name: "VS Code", Icon: Monitor, color: "#007ACC" },
      { name: "C++", Icon: SiCplusplus, color: "#00599C" },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="container relative">
        <SectionHeading eyebrow="Skills" title="Tools & Technologies" description="The stack I use to bring ideas to life" />

        <div className="mx-auto max-w-7xl space-y-12">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: groupIndex * 0.06 }}
            >
              <h3 className="mb-4 text-xl font-bold text-muted-foreground md:text-2xl">{group.title}</h3>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {group.items.map(({ name, Icon, color }, index) => (
                  <motion.div
                    key={`${group.title}-${name}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.24, delay: index * 0.018 }}
                    whileHover={{ y: -4 }}
                    className="group inline-flex h-16 min-w-[126px] items-center gap-3 rounded-xl border border-border/70 bg-background/70 px-4 shadow-sm transition-all hover:border-primary/40 hover:bg-background hover:shadow-elegant sm:min-w-[136px]"
                  >
                    <Icon
                      className="h-6 w-6 shrink-0 text-muted-foreground transition-transform group-hover:scale-110"
                      style={{ color }}
                    />
                    <span className="text-[15px] font-bold text-foreground">{name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
