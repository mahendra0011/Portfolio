import { motion } from "framer-motion";
import ElectricBorder from "@/components/reactbits/ElectricBorder";

const stats = [
  { value: 15, suffix: "+", label: "Projects Built" },
  { value: 1200, suffix: "+", label: "GitHub Commits" },
  { value: 50, suffix: "+", label: "Technologies" },
  { value: 2.5, suffix: "+", label: "Years Experience", isFloat: true },
];

const StatsSection = () => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-2 lg:grid-cols-4 overflow-visible">
      {stats.map((stat, index) => (
        <div key={stat.label} className="overflow-visible">
          <ElectricBorder
            color="#4A82E8"
            speed={1}
            chaos={0.12}
            borderRadius={40}
            borderOffset={20}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px 0px" }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="exact-match-card flex h-[250px] w-[250px] flex-col rounded-[40px] justify-center items-center cursor-pointer overflow-visible"
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
          </ElectricBorder>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;