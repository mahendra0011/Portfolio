import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { SiCplusplus, SiPython, SiHtml5, SiCss, SiTailwindcss, SiJavascript, SiReact, SiRedux, SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiGit, SiGithub, SiPostman, SiMui, SiShadcnui, } from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { Sparkles } from "lucide-react";
const groups = [
    {
        title: "Languages",
        items: [
            { name: "Python", Icon: SiPython, color: "#3776AB" },
            { name: "C++", Icon: SiCplusplus, color: "#00599C" },
            { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
            { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
            { name: "CSS", Icon: SiCss, color: "#1572B6" },
            { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
        ],
    },
    {
        title: "Frameworks & Libraries",
        items: [
            { name: "React", Icon: SiReact, color: "#61DAFB" },
            { name: "Redux", Icon: SiRedux, color: "#764ABC" },
            { name: "ReactBits", Icon: Sparkles, color: "#22D3EE" },
            { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
            { name: "Express", Icon: SiExpress, color: "#ffffff" },
            { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
            { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
            { name: "Material UI", Icon: SiMui, color: "#007FFF" },
            { name: "shadcn/ui", Icon: SiShadcnui, color: "#ffffff" },
        ],
    },
    {
        title: "Developer Tools",
        items: [
            { name: "VS Code", Icon: VscCode, color: "#007ACC" },
            { name: "Git", Icon: SiGit, color: "#F05032" },
            { name: "GitHub", Icon: SiGithub, color: "#ffffff" },
            { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
        ],
    },
];
const Skills = () => {
    return (<section id="skills" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="container relative">
        <SectionHeading eyebrow="Skills" title="Tools & Technologies" description="The stack I use to bring ideas to life"/>

        <div className="space-y-10">
          {groups.map((group, gi) => (<div key={group.title}>
              <motion.h3 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-xl font-semibold mb-5 text-muted-foreground">
                {group.title}
              </motion.h3>
              <div className="flex flex-wrap gap-4">
                {group.items.map((s, i) => (<motion.div key={s.name} initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (gi * 0.05) + i * 0.05 }} whileHover={{ y: -8, scale: 1.05 }} className="glass rounded-2xl px-5 py-4 flex items-center gap-3 cursor-default group hover:shadow-glow transition-all">
                    <s.Icon className="w-7 h-7 transition-transform group-hover:rotate-12" style={{ color: s.color }}/>
                    <span className="font-medium">{s.name}</span>
                  </motion.div>))}
              </div>
            </div>))}
        </div>
      </div>
    </section>);
};
export default Skills;
