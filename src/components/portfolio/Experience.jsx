import { motion } from "framer-motion";
import { Network, PhoneCall, RadioTower, Wrench } from "lucide-react";
import SectionHeading from "./SectionHeading";
const points = [
  {
    Icon: Network,
    text: "Worked with RailNet network infrastructure, connectivity monitoring, and internal railway data-network concepts.",
  },
  {
    Icon: PhoneCall,
    text: "Observed Railway Telephone Exchange and IP telephony systems, including SIP/VoIP communication and inter-exchange connectivity.",
  },
  {
    Icon: RadioTower,
    text: "Gained exposure to STTC operations, signalling and telecom equipment, OFC communication, and railway telecom technologies.",
  },
  {
    Icon: Wrench,
    text: "Assisted in Test Room activities such as equipment testing, fault analysis, inspection, and verification for signalling/telecom systems.",
  },
];

const Experience = () => {
  return (
  <section id="experience" className="section-grid section-grid-soft relative overflow-hidden bg-muted/30 py-20 sm:py-24">
    <div className="container relative z-10">
      <SectionHeading eyebrow="Experience" title="Professional Exposure" description="Hands-on learning from railway communication and telecom operations." />

      <div className="mx-auto max-w-4xl pt-4 pb-8">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px 0px" }}
           transition={{ duration: 0.12 }}
           className="relative"
         >
           {/* Timeline Line */}
           <div className="absolute left-[7px] md:left-[9px] top-[24px] bottom-0 w-[1px] bg-border/80" />
           
           <div className="relative pl-8 md:pl-12">
             {/* Timeline Dot */}
             <div className="absolute left-[1.5px] md:left-[3.5px] top-[11px] w-[12px] h-[12px] rounded-full border-2 border-muted-foreground/60 bg-background" />
             
             <div className="flex flex-col gap-1 mb-6">
               <span className="inline-flex w-fit rounded bg-secondary/50 border border-border/50 px-2.5 py-1 text-[10px] sm:text-xs font-semibold tracking-wider text-secondary-foreground uppercase mb-2">
                 Internship
               </span>
               <h3 className="text-xl font-bold sm:text-[22px] tracking-tight text-foreground">
                 Indian Railways – Signal & Telecommunication (S&T) Intern
               </h3>
               <p className="text-muted-foreground text-[15px] font-medium">
                 RailNet, IP telephony, signalling and telecom systems exposure
               </p>
             </div>

             <ul className="space-y-4 mt-6">
               {points.map(({ text }, index) => (
                 <li key={index} className="relative pl-5 text-[15px] leading-relaxed text-muted-foreground/90">
                   <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                   {text}
                 </li>
               ))}
             </ul>
           </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default Experience;
