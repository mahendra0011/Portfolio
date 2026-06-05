import { motion } from "framer-motion";
import { Database, Globe, Server, Wrench } from "lucide-react";
import SectionHeading from "./SectionHeading";

const groups = [
  {
    title: "Frontend",
    Icon: Globe,
    items: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Framer Motion",
      "JavaScript",
      "FlexSearch",
      "React",
      "React Router",
      "React Charts",
      "Redux",
      "Recoil",
      "MUI",
      "shadcn/ui",
      "ReactBits",
    ],
  },
  {
    title: "Backend",
    Icon: Server,
    items: [
      "Node.js",
      "Express.js",
      "REST API",
      "GraphQL",
      "Multer",
      "WebRTC",
      "JWT",
      "Axios",
      "Socket.IO",
      "Redis",
      "PDFKit",
      "Nodemailer",
    ],
  },
  {
    title: "Database & Services",
    Icon: Database,
    items: [
      "MongoDB",
      "MySQL",
      "Firebase",
      "Supabase",
      "Cloudinary",
      "Brevo",
      "SendGrid",
      "Razorpay",
      "Cashfree",
    ],
  },
  {
    title: "Deployment & Tools",
    Icon: Wrench,
    items: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "Docker",
      "Nginx",
      "AWS",
      "Google Cloud",
      "VPS",
      "Serverless",
      "Hostinger",
      "Postman",
      "Excel",
      "MapCN",
      "VS Code",
      "C++",
      "Python",
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="container relative">
        <SectionHeading eyebrow="Skills" title="Tools & Technologies" description="The stack I use to bring ideas to life" />

        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: groupIndex * 0.06 }}
              className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center shadow-glow">
                  <group.Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item, index) => (
                  <motion.span
                    key={`${group.title}-${item}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: index * 0.015 }}
                    className="rounded-full bg-secondary/80 px-3.5 py-2 text-sm font-semibold text-secondary-foreground border border-border/50"
                  >
                    {item}
                  </motion.span>
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
