import { motion } from "framer-motion";
import { Award, GraduationCap, School } from "lucide-react";
import SectionHeading from "./SectionHeading";

const items = [
  {
    icon: GraduationCap,
    period: "2023 - 2027",
    title: "B.Tech - Electronics & Communication Engineering",
    place: "Shri Ram Institute of Technology, Jabalpur (M.P.)",
    description: "Currently pursuing with CGPA 7.0/10 while building real-world full-stack MERN projects.",
  },
  {
    icon: School,
    period: "2022 - 2023",
    title: "Class XII - Higher Secondary (MP Board)",
    place: "Saraswati Shiksha Mandir, Jabalpur (M.P.)",
    description: "Completed higher secondary education with 61%.",
  },
  {
    icon: Award,
    period: "2020 - 2021",
    title: "Class X - Secondary (MP Board)",
    place: "Saraswati Shiksha Mandir, Jabalpur (M.P.)",
    description: "Completed secondary education with 81%.",
  },
];

const Education = () => (
  <section id="education" className="section-band py-20 sm:py-24">
    <div className="container">
      <SectionHeading eyebrow="Journey" title="Education & Experience" description="Academic path and practical development work." />

      <div className="mx-auto max-w-4xl">
        <div className="grid gap-4">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass rounded-lg p-5 shadow-sm transition-shadow hover:shadow-glow"
            >
              <div className="grid gap-4 sm:grid-cols-[3.5rem_1fr]">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{item.period}</span>
                  <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{item.place}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Education;
