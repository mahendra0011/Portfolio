import { motion } from "framer-motion";
import {
  SiCplusplus,
  SiCss,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMui,
  SiNodedotjs,
  SiPostman,
  SiPython,
  SiReact,
  SiRedux,
  SiShadcnui,
  SiTailwindcss,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";

const groups = [
  {
    title: "Languages",
    items: [
      { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", Icon: SiCss, color: "#1572B6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#B7791F" },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "C++", Icon: SiCplusplus, color: "#00599C" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", Icon: SiReact, color: "#0284C7" },
      { name: "Redux", Icon: SiRedux, color: "#764ABC" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#0891B2" },
      { name: "shadcn/ui", Icon: SiShadcnui, color: "#111827" },
      { name: "ReactBits", Icon: Sparkles, color: "#0F766E" },
      { name: "Material UI", Icon: SiMui, color: "#007FFF" },
    ],
  },
  {
    title: "Backend & Tools",
    items: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
      { name: "Express", Icon: SiExpress, color: "#111827" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "Firebase", Icon: SiFirebase, color: "#B7791F" },
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#111827" },
      { name: "VS Code", Icon: VscCode, color: "#007ACC" },
      { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
    ],
  },
];

const Skills = () => (
  <section id="skills" className="section-band py-20 sm:py-24">
    <div className="container">
      <SectionHeading eyebrow="Skills" title="Tools & Technologies" description="The stack I use to build practical web applications." />

      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {groups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: groupIndex * 0.08 }}
            className="glass rounded-lg p-5 shadow-sm"
          >
            <h3 className="mb-4 text-lg font-bold">{group.title}</h3>
            <div className="grid gap-3 xl:grid-cols-2">
              {group.items.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  whileHover={{ y: -4 }}
                  className="flex min-h-16 items-center gap-3 rounded-lg border border-border/65 bg-card/75 px-3 py-3"
                >
                  <skill.Icon className="h-6 w-6 shrink-0" style={{ color: skill.color }} />
                  <span className="text-sm font-semibold">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
