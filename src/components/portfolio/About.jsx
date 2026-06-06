import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Code2, Rocket, Coffee } from "lucide-react";
import SectionHeading from "./SectionHeading";

const stats = [
  { icon: Code2, value: 10, label: "Projects Built", suffix: "+" },
  { icon: Rocket, value: 900, label: "GitHub Commits", suffix: "+" },
  { icon: Coffee, value: 50, label: "Technologies", suffix: "+" },
];

const Counter = ({ to, suffix }) => {
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
      } else {
        setN(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(id);
  }, [inView, to]);

  return <span ref={ref}>{n}{suffix}</span>;
};

const About = () => {
  return (
    <section id="about" className="section-grid section-grid-soft py-24 relative overflow-hidden lg:min-h-[92vh]">
      <div className="container">
        <SectionHeading eyebrow="About Me" title="Crafting Digital Experiences" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div
            className="relative mx-auto flex min-h-[460px] w-full max-w-[430px] items-end justify-center lg:mx-0 lg:min-h-[600px]"
          >
            <div
              id="about-photo-anchor"
              aria-hidden="true"
              className="invisible h-[520px] w-full lg:h-[620px]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-muted-foreground leading-relaxed"
          >
            <div className="space-y-5">
              <p>
                I'm <span className="text-foreground font-semibold">Mahendra Prajapati</span>, currently pursuing
                <span className="text-foreground font-semibold"> B.Tech in Electronics & Communication Engineering</span> at
                Shri Ram Institute of Technology, Jabalpur (M.P.) - CGPA 7.0/10.
              </p>
              <p>
                I'm a passionate <span className="gradient-text font-semibold">Full Stack Developer</span> who loves building
                real-world applications. I have built 10+ projects including <span className="text-foreground font-semibold">MediCore</span>,
                <span className="text-foreground font-semibold"> EventO</span>, <span className="text-foreground font-semibold">MindSupport</span> and
                <span className="text-foreground font-semibold"> LostAndFound</span>, covering authentication, OTP verification,
                role-based dashboards, payments and production-style APIs.
              </p>
              <p>
                I led my team in the <span className="text-foreground font-semibold">Smart India Hackathon</span> internal round,
                have solved 100+ DSA problems in C++, and have shipped 900+ GitHub commits while learning modern web and cloud tools.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass group rounded-2xl p-5 text-center transition-shadow hover:shadow-glow"
                >
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl gradient-bg transition-transform group-hover:scale-110">
                    <s.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold gradient-text">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
