import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { BriefcaseBusiness, Clock3, Mail, MapPin, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import ElectricBorder from "../reactbits/ElectricBorder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
const schema = z.object({
    name: z.string().trim().min(2, "Name is too short").max(100),
    email: z.string().trim().email("Invalid email").max(255),
    message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

const contactDetails = [
    { Icon: Mail, label: "Email", value: "mahendrapra0077@gmail.com" },
    { Icon: FaWhatsapp, label: "WhatsApp", value: "+91 7724822660", href: "https://wa.me/917724822660" },
    { Icon: MapPin, label: "Location", value: "Jabalpur, Madhya Pradesh" },
    { Icon: BriefcaseBusiness, label: "Open to", value: "Internships, freelance work, and MERN projects" },
    { Icon: Clock3, label: "Response", value: "Usually within 24-48 hours" },
];

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const result = schema.safeParse(form);
        if (!result.success) {
            const errs = {};
            result.error.issues.forEach((i) => { errs[i.path[0]] = i.message; });
            setErrors(errs);
            return;
        }
        setErrors({});
        setLoading(true);
        setTimeout(() => {
            toast.success("Message sent! I'll get back to you soon.");
            setForm({ name: "", email: "", message: "" });
            setLoading(false);
        }, 800);
    };
    return (<section id="contact" className="section-grid section-grid-soft relative overflow-hidden py-20 sm:py-24">
      <div className="container relative z-10">
        <SectionHeading eyebrow="Contact" title="Professional Inquiries" description="For project work, internships, or collaboration, send a concise message with the key details."/>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
<motion.div
             initial={{ opacity: 0, x: 12 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-260px 0px" }}
             transition={{ duration: 0.12 }}
             className="overflow-visible"
           >
            <ElectricBorder
              color="#4A82E8"
              speed={1}
              chaos={0.12}
              borderRadius={16}
              borderOffset={20}
            >
              <div className="glass rounded-2xl p-6 md:p-8 transition-all hover:shadow-glow h-full overflow-visible">
                <div className="mb-7">
                  <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    Available for selected opportunities
                  </span>
                  <h3 className="mt-4 text-2xl font-bold">Start a focused conversation</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Share the project goal, expected timeline, and the support you need. I will review it and reply by email.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactDetails.map(({ Icon, label, value, href }, index) => (
<motion.div
                       key={label}
                       initial={{ opacity: 0, y: 8 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true, margin: "-220px 0px" }}
                       transition={{ duration: 0.12, delay: index * 0.01 }}
                       className="flex gap-4 border-t border-border/60 pt-4 first:border-t-0 first:pt-0"
                     >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl gradient-bg shadow-glow">
                        <Icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 block break-words font-semibold text-foreground transition-colors hover:text-primary"
                          >
                            {value}
                          </a>
                        ) : (
                          <div className="mt-1 break-words font-semibold text-foreground">{value}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ElectricBorder>
          </motion.div>

<motion.form
             onSubmit={handleSubmit}
             initial={{ opacity: 0, x: 12 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-260px 0px" }}
             transition={{ duration: 0.12 }}
             className="overflow-visible"
           >
            <ElectricBorder
              color="#4A82E8"
              speed={1}
              chaos={0.12}
              borderRadius={16}
              borderOffset={20}
            >
              <div className="glass rounded-2xl p-6 space-y-4 transition-all hover:shadow-glow h-full overflow-visible">
                <div>
                  <h3 className="text-2xl font-bold">Send a message</h3>
                  <p className="mt-2 text-sm text-muted-foreground">A brief, clear note helps me respond with the right next step.</p>
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" maxLength={100}/>
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" maxLength={255}/>
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project..." maxLength={1000}/>
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>
                <Button type="submit" disabled={loading} size="lg" className="w-full gradient-bg shadow-glow">
                  {loading ? "Sending..." : <>Send Message <Send className="ml-2 w-4 h-4"/></>}
                </Button>
              </div>
            </ElectricBorder>
          </motion.form>
        </div>
      </div>
    </section>);
};
export default Contact;