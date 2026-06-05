import { motion } from "framer-motion";
import { GraduationCap, School, Award } from "lucide-react";
import SectionHeading from "./SectionHeading";

const items = [
  {
    icon: GraduationCap,
    period: "2023 — 2027",
    title: "B.Tech — Electronics & Communication Engineering",
    place: "Shri Ram Institute of Technology, Jabalpur (M.P.)",
    description: "Currently pursuing with CGPA 7.0/10 while building real-world full-stack MERN projects.",
  },
  {
    icon: School,
    period: "2022 — 2023",
    title: "Class XII — Higher Secondary (MP Board)",
    place: "Saraswati Shiksha Mandir, Jabalpur (M.P.)",
    description: "Completed higher secondary education with 61%.",
  },
  {
    icon: Award,
    period: "2020 — 2021",
    title: "Class X — Secondary (MP Board)",
    place: "Saraswati Shiksha Mandir, Jabalpur (M.P.)",
    description: "Completed secondary education with 81%.",
  },
];

const Education = () => {
  return (
    <section id="education" className="py-24 bg-muted/30">
      <div className="container">
        <SectionHeading eyebrow="Journey" title="Education" />

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 gradient-bg md:-translate-x-1/2" />

          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`relative mb-10 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"} pl-12 md:pl-0`}
            >
              {/* Dot */}
              <div className={`absolute top-4 w-8 h-8 rounded-full gradient-bg shadow-glow flex items-center justify-center ${
                i % 2 === 0 ? "left-0 md:left-auto md:-right-4" : "left-0 md:-left-4"
              }`}>
                <item.icon className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow">
                <span className="text-xs font-semibold gradient-text uppercase tracking-wider">{item.period}</span>
                <h3 className="text-lg font-bold mt-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-medium mb-2">{item.place}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
