import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { Code2, Rocket, GraduationCap, Coffee } from "lucide-react";

const stats = [
  { icon: Code2, value: 4, label: "Major Projects", suffix: "+" },
  { icon: Rocket, value: 400, label: "GitHub Commits", suffix: "+" },
  { icon: GraduationCap, value: 100, label: "DSA Problems Solved", suffix: "+" },
  { icon: Coffee, value: 15, label: "Technologies", suffix: "+" },
];

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const inc = to / steps;
    const id = setInterval(() => {
      start += inc;
      if (start >= to) {
        setN(to);
        clearInterval(id);
      } else setN(Math.floor(start));
    }, stepTime);
    return () => clearInterval(id);
  }, [inView, to]);

  return <span ref={ref}>{n}{suffix}</span>;
};

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container">
        <SectionHeading eyebrow="About Me" title="Crafting Digital Experiences" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-muted-foreground leading-relaxed"
          >
            <p>
              I'm <span className="text-foreground font-semibold">Mahendra Prajapati</span>, currently pursuing
              <span className="text-foreground font-semibold"> B.Tech in Electronics & Communication Engineering</span> at
              Shri Ram Institute of Technology, Jabalpur (M.P.) — CGPA 7.0/10.
            </p>
            <p>
              I'm a passionate <span className="gradient-text font-semibold">Full Stack Developer</span> who loves building
              real-world MERN applications. I've shipped projects like <span className="text-foreground font-semibold">MediCore</span>,
              <span className="text-foreground font-semibold"> EventO</span>, <span className="text-foreground font-semibold">MindSupport</span> and
              <span className="text-foreground font-semibold"> LostAndFound</span> — covering authentication, OTP verification,
              role-based dashboards, payments and more.
            </p>
            <p>
              I led my team in the <span className="text-foreground font-semibold">Smart India Hackathon</span> internal round
              and have solved 100+ DSA problems in C++. I'm always exploring new tech and pushing code daily — 400+ commits and counting.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-6 text-center group hover:shadow-glow transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <s.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold gradient-text">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;