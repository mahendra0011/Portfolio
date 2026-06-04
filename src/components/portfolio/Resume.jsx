import { motion } from "framer-motion";
import { Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";

const RESUME_URL = "/Mahendra_Resume.pdf";

const Resume = () => (
  <section id="resume" className="py-20 sm:py-24">
    <div className="container">
      <SectionHeading eyebrow="Resume" title="My Full Resume" description="Preview my resume below or download a copy." />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-5xl"
      >
        <div className="mb-7 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="gradient-bg shadow-glow transition-transform hover:scale-[1.02]">
            <a href={RESUME_URL} download>
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-card/80 transition-transform hover:scale-[1.02]">
            <a href={RESUME_URL} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in New Tab
            </a>
          </Button>
        </div>

        <div className="glass overflow-hidden rounded-lg p-2 shadow-elegant">
          <object data={`${RESUME_URL}#view=FitH`} type="application/pdf" className="h-[78vh] w-full rounded-lg bg-background">
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <FileText className="h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">Your browser cannot display PDFs inline.</p>
              <Button asChild className="gradient-bg">
                <a href={RESUME_URL} download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </object>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Resume;
