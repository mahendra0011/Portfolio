import { motion } from "framer-motion";
import ElectricBorder from "@/components/reactbits/ElectricBorder";
import SlidingLogoMarquee from "@/components/reactbits/SlidingLogoMarquee";
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiRedis,
  SiApachekafka,
  SiNginx,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiFirebase,
  SiSupabase,
} from "react-icons/si";
import { CloudCog } from "lucide-react";

const stats = [
  { value: 15, suffix: "+", label: "Projects Built" },
  { value: 1200, suffix: "+", label: "GitHub Commits" },
  { value: 50, suffix: "+", label: "Technologies" },
  { value: 2.5, suffix: "+", label: "Years Experience", isFloat: true },
];

const StatsSection = () => {
  return (
    <>
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
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-260px 0px" }}
              transition={{ duration: 0.12, delay: index * 0.01 }}
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

    {/* Tech Stack Marquee */}
    <div className="relative mt-16 sm:mt-20">
      <SlidingLogoMarquee
        items={[
          { id: "javascript", name: "JavaScript", content: <SiJavascript className="h-full w-full" style={{ color: "#F7DF1E" }} />, href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
          { id: "react", name: "React", content: <SiReact className="h-full w-full" style={{ color: "#61DAFB" }} />, href: "https://react.dev" },
          { id: "nodejs", name: "Node.js", content: <SiNodedotjs className="h-full w-full" style={{ color: "#339933" }} />, href: "https://nodejs.org" },
          { id: "express", name: "Express", content: <SiExpress className="h-full w-full" style={{ color: "#ffffff" }} />, href: "https://expressjs.com" },
          { id: "mongodb", name: "MongoDB", content: <SiMongodb className="h-full w-full" style={{ color: "#47A248" }} />, href: "https://mongodb.com" },
          { id: "postgresql", name: "PostgreSQL", content: <SiPostgresql className="h-full w-full" style={{ color: "#4169E1" }} />, href: "https://postgresql.org" },
          { id: "mysql", name: "MySQL", content: <SiMysql className="h-full w-full" style={{ color: "#4479A1" }} />, href: "https://mysql.com" },
          { id: "docker", name: "Docker", content: <SiDocker className="h-full w-full" style={{ color: "#2496ED" }} />, href: "https://docker.com" },
          { id: "aws", name: "AWS", content: <CloudCog className="h-full w-full" style={{ color: "#FF9900" }} />, href: "https://aws.amazon.com" },
          { id: "redis", name: "Redis", content: <SiRedis className="h-full w-full" style={{ color: "#DC382D" }} />, href: "https://redis.io" },
          { id: "kafka", name: "Kafka", content: <SiApachekafka className="h-full w-full" style={{ color: "#231F20" }} />, href: "https://kafka.apache.org" },
          { id: "nginx", name: "Nginx", content: <SiNginx className="h-full w-full" style={{ color: "#009639" }} />, href: "https://nginx.org" },
          { id: "git", name: "Git", content: <SiGit className="h-full w-full" style={{ color: "#F05032" }} />, href: "https://git-scm.com" },
          { id: "github", name: "GitHub", content: <SiGithub className="h-full w-full" style={{ color: "#ffffff" }} />, href: "https://github.com" },
          { id: "githubactions", name: "GitHub Actions", content: <SiGithubactions className="h-full w-full" style={{ color: "#2088FF" }} />, href: "https://github.com/features/actions" },
          { id: "firebase", name: "Firebase", content: <SiFirebase className="h-full w-full" style={{ color: "#FFCA28" }} />, href: "https://firebase.google.com" },
          { id: "supabase", name: "Supabase", content: <SiSupabase className="h-full w-full" style={{ color: "#3FCF8E" }} />, href: "https://supabase.com" },
        ]}
        speed={3}
        height="140px"
        pauseOnHover={true}
        showControls={false}
        gap="3rem"
      />
    </div>
    </>
  );
};

export default StatsSection;