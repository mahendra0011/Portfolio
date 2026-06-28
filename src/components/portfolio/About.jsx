import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import StatsSection from "./StatsSection";

const About = () => {
  return (
    <section
      id="about"
      className="section-grid section-grid-soft relative py-20 sm:py-24 lg:min-h-[92vh]"
    >
      <div className="container relative z-10">
        <SectionHeading eyebrow="About Me" title="Building Impactful Digital Products" />
        <div id="about-content-grid" className="grid gap-4 sm:gap-6 lg:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          {/* LEFT COLUMN — anchor for floating image */}
          <div className="about-photo-stage relative mx-auto flex w-full max-w-[430px] items-start justify-center lg:mx-0">
            <div
              id="about-photo-anchor"
              aria-hidden="true"
              className="floating-photo-anchor floating-photo-anchor--about
                         w-full pointer-events-none select-none
                         min-h-[340px] sm:min-h-[420px] lg:min-h-0"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px 0px" }}
            transition={{ duration: 0.12 }}
            className="relative z-10 space-y-6 text-muted-foreground leading-relaxed -mt-8 sm:-mt-12"
          >
            <div className="space-y-4">
              <p>
                I'm <span className="text-foreground font-semibold">Mahendra Prajapati</span>, a passionate{" "}
                <span className="gradient-text font-semibold">Freelance Full Stack web Developer</span> who builds reliable,
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
              <p className="-mt-12">
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