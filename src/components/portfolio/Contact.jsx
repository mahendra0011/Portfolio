import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "./SectionHeading";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

const socials = [
  { Icon: Mail, label: "Gmail", value: "mahendrapra0077@gmail.com", href: "mailto:mahendrapra0077@gmail.com" },
  { Icon: Linkedin, label: "LinkedIn", value: "/in/mahendra-prajapati-73163930b", href: "https://www.linkedin.com/in/mahendra-prajapati-73163930b" },
  { Icon: Github, label: "GitHub", value: "@mahendra0011", href: "https://github.com/mahendra0011" },
  { Icon: SiLeetcode, label: "LeetCode", value: "@mahendra_0011", href: "https://leetcode.com/u/mahendra_0011/" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = schema.safeParse(form);

    if (!result.success) {
      const nextErrors = {};
      result.error.issues.forEach((issue) => {
        nextErrors[issue.path[0]] = issue.message;
      });
      setErrors(nextErrors);
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

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="container">
        <SectionHeading eyebrow="Contact" title="Let's Build Together" description="Have a project idea, internship opportunity, or collaboration in mind? Send a message." />

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-lg p-5 shadow-sm"
          >
            <h3 className="mb-2 text-2xl font-bold">Get in touch</h3>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              I am open to MERN stack projects, frontend work, and learning-focused collaborations.
            </p>

            <div className="space-y-3">
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 rounded-lg border border-border/65 bg-card/75 p-4 transition-shadow hover:shadow-glow"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <social.Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{social.label}</div>
                    <div className="truncate font-semibold">{social.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-lg p-5 shadow-sm"
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Your name"
                  maxLength={100}
                  className="bg-card/80"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="you@example.com"
                  maxLength={255}
                  className="bg-card/80"
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  placeholder="Tell me about your project..."
                  maxLength={1000}
                  className="bg-card/80"
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <Button type="submit" disabled={loading} size="lg" className="w-full gradient-bg shadow-glow">
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
