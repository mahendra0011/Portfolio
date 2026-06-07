import { motion } from "framer-motion";
const SectionHeading = ({ eyebrow, title, description }) => (<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-10 max-w-2xl text-center sm:mb-16">
    <span className="inline-block px-4 py-1 rounded-full glass text-xs font-semibold gradient-text mb-4 uppercase tracking-wider">
      {eyebrow}
    </span>
    <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
    {description && <p className="text-base text-muted-foreground sm:text-lg">{description}</p>}
  </motion.div>);
export default SectionHeading;
