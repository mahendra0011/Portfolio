import { motion } from "framer-motion";
import { Trophy, Lightbulb, Code2, GitBranch } from "lucide-react";
import SectionHeading from "./SectionHeading";

const items = [
  {
    Icon: Trophy,
    title: "Smart India Hackathon — Team Leader",
    description:
      "Led a team in the Smart India Hackathon (Internal Round), successfully qualifying among 100+ competing teams.",
  },
  {
    Icon: Lightbulb,
    title: "SRIT Project Expo — Fuel Theft Detection System",
    description:
      "Presented an innovative IoT-based 'Fuel Theft Detection System' demonstrating real-world problem-solving.",
  },
  {
    Icon: Code2,
    title: "100+ DSA Problems Solved",
    description:
      "Solved 100+ problems in C++ on platforms like CodeHelp and other competitive coding sites.",
  },
  {
    Icon: GitBranch,
    title: "400+ GitHub Commits",
    description:
      "Consistently shipping code — 400+ commits across personal and full-stack project repositories.",
  },
];

const Achievements = () => (
  <section id="achievements" className="py-24 relative">
    <div className="container">
      <SectionHeading
        eyebrow="Achievements"
        title="Milestones & Recognition"
        description="Highlights from my journey so far"
      />
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass rounded-2xl p-6 flex gap-4 hover:shadow-glow transition-all group"
          >
            <div className="w-12 h-12 shrink-0 rounded-xl gradient-bg flex items-center justify-center group-hover:scale-110 transition-transform">
              <item.Icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Achievements;