import { motion } from "framer-motion";
import ShinyText from "@/components/reactbits/ShinyText";

const SectionHeading = ({ eyebrow, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px 0px" }}
    transition={{ duration: 0.12 }}
    className="mx-auto mb-10 max-w-2xl text-center sm:mb-16"
  >
    <span className="inline-block px-4 py-1 rounded-full glass text-xs font-semibold gradient-text mb-4 uppercase tracking-wider">
      {eyebrow}
    </span>
    <h2 className="section-title mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
      <ShinyText 
        text={title} 
        speed={2.5} 
        delay={0.5} 
        color="#a0aab8" 
        shineColor="#ffffff" 
        spread={100} 
        direction="left"
      />
    </h2>
    {description && (
      <p className="text-base section-desc sm:text-lg">{description}</p>
    )}
  </motion.div>
);

export default SectionHeading;
