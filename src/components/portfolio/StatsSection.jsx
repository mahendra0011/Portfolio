import { motion } from "framer-motion";

const stats = [
  { value: 15, suffix: "+", label: "Projects Built" },
  { value: 1200, suffix: "+", label: "GitHub Commits" },
  { value: 50, suffix: "+", label: "Technologies" },
  { value: 2.5, suffix: "+", label: "Years Experience", isFloat: true },
];

const StatsSection = () => {
  return (
    <section className="py-10 sm:py-14">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto justify-items-center select-none">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="exact-match-card flex flex-col justify-center items-center cursor-pointer mx-auto"
            style={{ width: "200px", height: "200px" }}
          >
            <div className="text-center z-10 flex flex-col items-center px-3">
              <div className="flex items-baseline justify-center font-black tracking-tighter" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="text-[3.5rem] leading-none liquid-marble-fill">
                  {stat.isFloat ? stat.value.toFixed(1) : stat.value}
                </span>
                <span className="text-[3rem] leading-none liquid-marble-fill ml-0.5">
                  {stat.suffix}
                </span>
              </div>
              <p className="liquid-marble-fill text-[1rem] font-semibold tracking-tight mt-2 text-center whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif" }}>
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;