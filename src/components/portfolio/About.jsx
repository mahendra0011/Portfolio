import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import StatsSection from "./StatsSection";

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
          </motion.div>
        </div>
        <StatsSection />
      </div>
    </section>
  );
};

export default About;
