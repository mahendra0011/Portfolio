import { motion } from "framer-motion";

const SectionHeading = ({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center max-w-2xl mx-auto mb-16"
  >
    <span className="inline-block px-4 py-1 rounded-full glass text-xs font-semibold gradient-text mb-4 uppercase tracking-wider">
      {eyebrow}
    </span>
    <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
    {description && <p className="text-muted-foreground text-lg">{description}</p>}
  </motion.div>
);

export default SectionHeading;