import { motion } from "framer-motion";

const stats = [
  { value: 15, suffix: "+", label: "Projects Built" },
  { value: 1200, suffix: "+", label: "GitHub Commits" },
  { value: 50, suffix: "+", label: "Technologies" },
  { value: 2.5, suffix: "+", label: "Years Experience", isFloat: true },
];

const StatsSection = () => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="exact-match-card flex h-[250px] w-[250px] flex-col rounded-[40px] justify-center items-center cursor-pointer"
        >
          <div className="text-center flex flex-col items-center px-4">
            <div className="flex items-baseline justify-center font-black tracking-tighter">
              <span className="text-[5rem] leading-none liquid-marble-fill">
                {stat.isFloat ? stat.value.toFixed(1) : stat.value}
              </span>
              <span className="text-[4.2rem] leading-none liquid-marble-fill ml-0.5">
                {stat.suffix}
              </span>
            </div>
            <p className="liquid-marble-fill text-[1.4rem] font-semibold tracking-tight mt-3 text-center whitespace-nowrap">
              {stat.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection;