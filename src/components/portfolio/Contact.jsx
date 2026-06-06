import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { BriefcaseBusiness, Clock3, Mail, MapPin, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
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
    return (<section id="contact" className="section-grid section-grid-soft py-24 relative overflow-hidden">
      <div className="container relative z-10">
        <SectionHeading eyebrow="Contact" title="Professional Inquiries" description="For project work, internships, or collaboration, send a concise message with the key details."/>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6 md:p-8">
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
              {contactDetails.map(({ Icon, label, value }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="flex gap-4 border-t border-border/60 pt-4 first:border-t-0 first:pt-0"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl gradient-bg shadow-glow">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
                    <div className="mt-1 font-semibold text-foreground">{value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6 space-y-4">
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
          </motion.form>
        </div>
      </div>
    </section>);
};
export default Contact;
