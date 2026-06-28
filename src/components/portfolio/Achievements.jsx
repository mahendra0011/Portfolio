import { motion } from "framer-motion";
import { Trophy, Linkedin, Code2, GitBranch } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ElectricBorder from "../reactbits/ElectricBorder";
import { useTheme } from "@/hooks/useTheme";

const items = [
  {
    Icon: Trophy,
    title: "Smart India Hackathon - Team Leader",
    description: "Led a team in the Smart India Hackathon internal round, successfully qualifying among 100+ competing teams.",
  },
  {
    Icon: Linkedin,
    title: "1000+ LinkedIn Followers",
    description: "Built a growing professional network on LinkedIn by sharing development work, project updates and learning milestones.",
  },
  {
    Icon: Code2,
    title: "Built 20+ Projects",
    description: "Built 20+ practical web projects across full-stack applications, dashboards, booking systems, marketplaces and real-world MERN solutions.",
  },
  {
    Icon: GitBranch,
    title: "1700+ GitHub Commits",
    description: "Consistently shipping code across personal and full-stack project repositories with 1700+ contributions.",
  },
];

const Achievements = () => {
  const { theme } = useTheme();
  const isBento = theme === "bento";
  const isDark = theme === "dark";

  let glowColor = "#64748B"; // default grey
    if (isBento) glowColor = "#6B7280";
  if (isDark) glowColor = "#4A82E8";

  return (
    <section id="achievements" className="section-grid relative overflow-hidden py-20 sm:py-24">
      <div className="container relative z-10">
        <SectionHeading eyebrow="Achievements" title="Milestones & Recognition" description="Highlights from my journey so far" />
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto overflow-visible">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px 0px" }}
              transition={{ duration: 0.12, delay: i * 0.015 }}
              className="overflow-visible"
            >
              <ElectricBorder
                color={glowColor}
                speed={1}
                chaos={0.12}
                borderRadius={16}
                borderOffset={20}
              >
                <div className="glass rounded-2xl p-6 flex gap-4 hover:shadow-glow transition-all group h-full overflow-visible">
                  <div className="w-12 h-12 shrink-0 rounded-xl gradient-bg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </ElectricBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
