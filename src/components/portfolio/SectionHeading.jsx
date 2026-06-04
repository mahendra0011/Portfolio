import { motion } from "framer-motion";

const SectionHeading = ({ eyebrow, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55 }}
    className="mx-auto mb-12 max-w-2xl text-center"
  >
    <span className="mb-4 inline-flex rounded-lg border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
      {eyebrow}
    </span>
    <h2 className="text-3xl font-bold tracking-normal text-foreground md:text-5xl">{title}</h2>
    {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>}
  </motion.div>
);

export default SectionHeading;
