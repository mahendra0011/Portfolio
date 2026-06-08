import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Code2, Rocket, Coffee } from "lucide-react";
import SectionHeading from "./SectionHeading";

const stats = [
  { icon: Code2, value: 15, label: "Projects Built", suffix: "+" },
  { icon: Rocket, value: 1000, label: "GitHub Commits", suffix: "+" },
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
    <section id="about" className="section-grid section-grid-soft relative overflow-hidden py-20 sm:py-24 lg:min-h-[92vh]">
      <div className="container">
        <SectionHeading eyebrow="About Me" title="Building Impactful Digital Products" />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">
          <div
            className="about-photo-stage relative mx-auto flex w-full max-w-[430px] items-end justify-center lg:mx-0"
          >
            <div
              id="about-photo-anchor"
              aria-hidden="true"
              className="floating-photo-anchor floating-photo-anchor--about invisible"
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
                I'm <span className="text-foreground font-semibold">Mahendra Prajapati</span>, a passionate{" "}
                <span className="gradient-text font-semibold">Full Stack Developer</span> who builds reliable,
                scalable, secure, user-focused, and high-performance web applications using modern web
                technologies that power impactful digital products.
              </p>
              <p>
                I specialize in building scalable, high-performance web applications with{" "}
                <span className="text-foreground font-semibold">
                  React.js, REST APIs, Node.js, Express.js, MongoDB, Docker, AWS
                </span>
                , and more. My focus is on creating clean user experiences, secure backend systems,
                and production-ready applications that solve real-world problems.
              </p>
              <p>
                I've built multiple full-stack projects, including business platforms, booking systems,
                dashboards, and management solutions. My goal is to build impactful projects that work
                efficiently and deliver meaningful value to the people who use them.
              </p>
              <p>
                Currently, I'm seeking opportunities where I can contribute, learn from experienced
                teams, and deliver impactful digital solutions.
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
                  className="glass group rounded-xl p-4 text-center transition-shadow hover:shadow-glow sm:p-3.5"
                >
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg gradient-bg transition-transform group-hover:scale-110">
                    <s.icon className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="text-2xl font-bold gradient-text">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{s.label}</div>
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
