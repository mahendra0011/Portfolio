import { motion } from "framer-motion";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "./Footer";
import Navbar from "./Navbar";

const RESUME_URL = "/Mahendra_Resume.pdf";
const RESUME_PREVIEW_URL = "/resume-preview.png";
const resumeLinks = [
  {
    label: "Call Mahendra Prajapati",
    href: "tel:+917724822660",
    rect: { left: 20.704, top: 7.326, width: 14.808, height: 1.634 },
  },
  {
    label: "Email Mahendra Prajapati",
    href: "mailto:mahendrapra0077@gmail.com",
    rect: { left: 35.729, top: 7.326, width: 23.668, height: 1.634 },
  },
  {
    label: "Open LinkedIn profile",
    href: "https://www.linkedin.com/in/mahendra-prajapati-73163930b",
    rect: { left: 60.699, top: 7.326, width: 8.436, height: 1.634 },
    external: true,
  },
  {
    label: "Open GitHub profile",
    href: "https://github.com/mahendra0011",
    rect: { left: 70.437, top: 7.326, width: 7.656, height: 1.634 },
    external: true,
  },
  {
    label: "Open MediCore project",
    href: "https://medicore-main-1.onrender.com",
    rect: { left: 4.543, top: 45.627, width: 12.001, height: 1.853 },
    external: true,
  },
  {
    label: "Open EventO project",
    href: "https://enento.onrender.com",
    rect: { left: 4.543, top: 60.434, width: 9.705, height: 1.853 },
    external: true,
  },
  {
    label: "Open LostAndFound project",
    href: "https://lost-and-found-xlvq.onrender.com/",
    rect: { left: 4.543, top: 71.844, width: 16.698, height: 1.853 },
    external: true,
  },
  {
    label: "Open HTML CSS Udemy certificate",
    href: "https://ude.my/UC-d02ea3c0-c70a-48cc-b289-9766706fdaf5",
    rect: { left: 10.861, top: 96.273, width: 19.48, height: 1.37 },
    external: true,
  },
  {
    label: "Open complete web development certificate",
    href: "/cert-udemy-complete.pdf",
    rect: { left: 64.13, top: 96.273, width: 26.507, height: 1.37 },
    external: true,
  },
];

const Resume = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main className="relative overflow-hidden pt-24 pb-20">
      <div className="absolute inset-0 hero-bg pointer-events-none" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <span className="inline-block px-4 py-1 rounded-full glass text-xs font-semibold gradient-text mb-4 uppercase tracking-wider">
            Resume
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My Full <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            View my resume below or download a copy for quick reference.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full gradient-bg shadow-glow hover:scale-105 transition-transform sm:w-auto">
              <a href={RESUME_URL} download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full hover:scale-105 transition-transform sm:w-auto">
              <a href={RESUME_URL} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open PDF
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full hover:scale-105 transition-transform sm:w-auto">
              <a href="/#home">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Portfolio
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-5xl"
        >
          <div className="glass rounded-2xl p-2 shadow-glow overflow-hidden sm:p-3">
            <div className="relative aspect-[8.5/11] overflow-hidden rounded-xl bg-white">
              <img
                src={RESUME_PREVIEW_URL}
                alt="Mahendra Prajapati resume preview"
                className="block h-full w-full object-contain"
                draggable="false"
              />
              {resumeLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="absolute rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
                  style={{
                    left: `${link.rect.left}%`,
                    top: `${link.rect.top}%`,
                    width: `${link.rect.width}%`,
                    height: `${link.rect.height}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Resume;
