import { motion } from "framer-motion";
import { Building2, Network, PhoneCall, RadioTower, Wrench } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ElectricBorder from "../reactbits/ElectricBorder";

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

const Experience = () => (
  <section id="experience" className="section-grid section-grid-soft relative overflow-hidden bg-muted/30 py-20 sm:py-24">
    <div className="container relative z-10">
      <SectionHeading eyebrow="Experience" title="Professional Exposure" description="Hands-on learning from railway communication and telecom operations." />

      {/* overflow-visible is important here: ElectricBorder draws its glow
          OUTSIDE the card edges (controlled by borderOffset). If any
          ancestor clips overflow, the border gets cut off and looks "missing". */}
      <div className="mx-auto max-w-5xl overflow-visible">
<motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px 0px" }}
           transition={{ duration: 0.3 }}
           className="overflow-visible"
         >
          <ElectricBorder
            color="#4A82E8"
            speed={1}
            chaos={0.12}
            borderRadius={16}
            borderOffset={20}
          >
            <article className="glass rounded-2xl p-6 md:p-8 shadow-elegant">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-7">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-glow">
                    <Building2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold sm:text-2xl">Indian Railways - Signal & Telecommunication (S&T) Intern</h3>
                    <p className="text-muted-foreground mt-1">RailNet, IP telephony, signalling and telecom systems exposure</p>
                  </div>
                </div>
                <span className="inline-flex w-fit rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-secondary-foreground">
                  Internship
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {points.map(({ Icon, text }, index) => (
<motion.div
                     key={text}
                     initial={{ opacity: 0, y: 16 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-80px 0px" }}
                     transition={{ duration: 0.3, delay: index * 0.06 }}
                     className="rounded-xl bg-background/70 border border-border/60 p-4 flex gap-3"
                 >
                    <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </motion.div>
                ))}
              </div>
            </article>
          </ElectricBorder>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Experience;
