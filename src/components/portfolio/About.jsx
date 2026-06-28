import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import StatsSection from "./StatsSection";

const About = () => {
  return (
    <section
      id="about"
      className="section-grid section-grid-soft relative overflow-hidden py-20 sm:py-24 lg:min-h-[92vh]"
    >
      <div className="container">
        <SectionHeading eyebrow="About Me" title="Building Impactful Digital Products" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12">

          {/* LEFT COLUMN — anchor for floating image to land here */}
          <div className="about-photo-stage relative mx-auto flex w-full max-w-[430px] items-start justify-center lg:mx-0">
            {/*
              ANDROID FIX — Mobile anchor height:
              On mobile (single-column layout), this div sits ABOVE the text.
              Without explicit height, getBoundingClientRect() returns h=0 and
              the floating image doesn't know where to land.

              `min-h-[260px] sm:min-h-[320px]` gives the anchor real space on
              mobile so:
                1. The image has a visible landing target
                2. The text below doesn't start at y=0 (which caused overlap)

              `lg:min-h-0` resets to 0 on desktop so your existing
              `.floating-photo-anchor--about` CSS class controls the size
              exactly as before — zero change to Windows/desktop layout.
            */}
            <div
              id="about-photo-anchor"
              aria-hidden="true"
              className="floating-photo-anchor floating-photo-anchor--about
                         w-full pointer-events-none select-none
                         min-h-[260px] sm:min-h-[320px] lg:min-h-0"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px 0px" }}
            transition={{ duration: 0.12 }}
            /*
              ANDROID FIX — Mobile margin:
              Original: `-mt-32 lg:-mt-40`
              Problem:  `-mt-32` = −128 px on mobile (single column) pulled the
                        text UP by 128 px, directly overlapping the image anchor.
                        On Android this made the text render ON TOP of the image.

              Fix:      `mt-6` on mobile gives 24 px of breathing room below the
                        image anchor before the text starts.
              Desktop:  `lg:-mt-40` is unchanged — the 2-column layout on large
                        screens still gets the same −160 px pull-up as before.
                        Zero impact on Windows / desktop appearance.
            */
            className="space-y-6 text-muted-foreground leading-relaxed mt-6 lg:-mt-40"
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